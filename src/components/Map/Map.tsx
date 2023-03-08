import React, { useState } from "react";
import { Container as NaverMapContainer, Listener, Marker, NaverMap, NavermapsProvider } from 'react-naver-maps'
import { AreaCode, Building, Coordinate } from "~/types";
import Loader from "../Loader";
import "./Map.scss"

export interface MarkerItem {
  price: number
  count: number
}

export interface AreaMarkerItem extends MarkerItem {
  areaCode: AreaCode
}

export interface BuildingMarkerItem extends MarkerItem {
  building: Building
}

interface Props {
  defaultZoomLevel: number
  markerItems?: Array<AreaMarkerItem | BuildingMarkerItem>
  onZoomChange?: (zoom: number) => void
  onBoundsChange?: (bounds: { max: Coordinate, min: Coordinate }) => void
  onMarkerClick?: (marker: AreaMarkerItem | BuildingMarkerItem) => void
  loading?: boolean
}

const Map = ({ defaultZoomLevel, onMarkerClick, markerItems, onZoomChange, onBoundsChange, loading = false }: Props) => {
  const [ boundsCoords, setBoundsCoords ] = useState<{ max: Coordinate, min: Coordinate }>()

  const handleMarkerClick = (marker: AreaMarkerItem | BuildingMarkerItem) => () => {
    onMarkerClick && onMarkerClick(marker)
  }

  const handleBoundsChange = (bounds: naver.maps.Bounds) => {
    setBoundsCoords(() => convertBounds(bounds))
  }

  const convertBounds = (bounds: naver.maps.Bounds): { max: Coordinate, min: Coordinate } => {
    const max = bounds.getMax()
    const min = bounds.getMin()
    return {
      max: { latitude: max.y, longitude: max.x },
      min: { latitude: min.y, longitude: min.x },
    }
  }

  const handleInit = (e: any, map: naver.maps.MapOptions) => {
    const { bounds } = map
    console.log('??')
    handleBoundsChange(bounds as naver.maps.Bounds)
    onBoundsChange && onBoundsChange(convertBounds(bounds as naver.maps.Bounds)!)
  }

  const handleIdle = () => {
    onBoundsChange && onBoundsChange(boundsCoords!!)
  }

  const createAreaMarker = (item: AreaMarkerItem) => {
    const { price, count } = item
    const { latitude, longitude } = item.areaCode.coordinate
    return (
      <Marker
        key={item.areaCode.address}
        position={new window.naver.maps.LatLng({ lat: latitude, lng: longitude })}
        title={item.areaCode.address}
        onClick={handleMarkerClick(item)}
        icon={{
          content: count !== 0 ? `
            <div class="marker area">
              <div style="width: 100%; text-align: center; font-size: 11px; margin-bottom: 5px">${item.areaCode.shortAddress}</div>
              <div style="width: 100%; text-align: center; font-size: 14px; margin-bottom: 5px; font-weight: 500">${(price / 10000).toFixed(1)}억</div>
              <div style="width: 100%; text-align: center; font-size: 11px">${count.toLocaleString()}건</div>
            </div>
          ` : `
            <div class="marker area empty">
              <div style="width: 100%; text-align: center; font-size: 11px;">${item.areaCode.shortAddress}</div>
            </div>
          `
        }}
      />
    )
  }

  const createBuildingMarker = (item: BuildingMarkerItem) => {
    const { price, count } = item
    const { latitude, longitude } = item.building.coordinate
    return (
      <Marker
        key={`${item.building.id}`}
        position={new window.naver.maps.LatLng({ lat: latitude, lng: longitude })}
        title={item.building.name}
        onClick={handleMarkerClick(item)}
        icon={{
          content: count !== 0 ? `
            <div class="marker building">
              <div style="width: 100%; text-align: center; font-size: 13px; margin-bottom: 5px; font-weight: 500">${(price / 10000).toFixed(1)}억</div>
              <div style="width: 100%; text-align: center; font-size: 11px">${count.toLocaleString()}건</div>
            </div>
          ` : ``
        }}
      />
    )
  }

  return (
    <NavermapsProvider ncpClientId={process.env.NCP_CLIENT_ID || "e5njzmk0hi"}>
      {
        loading && <Loader fullScreen={true} isEnableBackground={true} />
      }
      <NaverMapContainer
        id={'map'}
        className={'map'}
        style={{ width: '100%', height: '100%', borderTop: 'transparent' }}>
        <NaverMap
          onZoomChanged={zoomLevel => onZoomChange && onZoomChange(zoomLevel)}
          onBoundsChanged={handleBoundsChange}
          defaultCenter={{ lat: 37.5666103, lng: 126.9783882 }}
          defaultZoom={defaultZoomLevel}>
          <Listener type={"init"} listener={handleInit} />
          <Listener type={"idle"} listener={handleIdle} />
          {
            markerItems ? markerItems.map(item => {
              if (Object.hasOwn(item, 'areaCode')) {
                return createAreaMarker(item as AreaMarkerItem)
              } else {
                return createBuildingMarker(item as BuildingMarkerItem)
              }
            }) : <></>
          }
        </NaverMap>
      </NaverMapContainer>
    </NavermapsProvider>
  )
}

export default Map
