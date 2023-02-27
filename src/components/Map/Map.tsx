import React, { useState } from "react";
import { Container as NaverMapContainer, Listener, Marker, NaverMap, NavermapsProvider } from 'react-naver-maps'
import { Color } from "~/constants";
import { AreaCode, Coordinate } from "~/types";
import Loader from "../Loader";

interface MarkerItem {
  areaCode: AreaCode
  price: number
  count: number
}

interface Props {
  defaultZoomLevel: number
  markerItems?: Array<MarkerItem>
  onZoomChange?: (zoom: number) => void
  onBoundsChange?: (bounds: { max: Coordinate, min: Coordinate }) => void
  onMarkerClick?: (markerAttribute: any) => void
  loading?: boolean
}

const Map = ({ defaultZoomLevel, onMarkerClick, markerItems, onZoomChange, onBoundsChange, loading = false }: Props) => {
  const [ boundsCoords, setBoundsCoords ] = useState<{ max: Coordinate, min: Coordinate }>()

  const handleMarkerClick = (markerAttribute: any) => () => {
    onMarkerClick && onMarkerClick(markerAttribute)
  }

  const handleBoundsChange = (bounds: naver.maps.Bounds) => {
    const max = bounds.getMax()
    const min = bounds.getMin()
    setBoundsCoords(() => {
      return {
        max: { latitude: max.y, longitude: max.x },
        min: { latitude: min.y, longitude: min.x },
      }
    })
  }

  const handleIdle = () => {
    onBoundsChange && onBoundsChange(boundsCoords!!)
  }

  const handleMapTypeChange = (value: naver.maps.MapType) => {
    if (value) {
      // @ts-ignore
      handleBoundsChange(value.map.bounds)
    }
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
          onMapTypeChanged={handleMapTypeChange}
          defaultCenter={{ lat: 37.5666103, lng: 126.9783882 }}
          defaultZoom={defaultZoomLevel}>
          <Listener type={"idle"} listener={handleIdle} />
          {
            markerItems && markerItems.map(item => {
              const { latitude, longitude } = item.areaCode.coordinate
              return (
                <Marker
                  key={item.areaCode.address}
                  position={new window.naver.maps.LatLng({ lat: latitude, lng: longitude })}
                  title={item.areaCode.address}
                  onClick={handleMarkerClick(item)}
                  icon={{
                    content: `
                      <div style="
                        display: flex;
                        justify-content: center;
                        flex-wrap: wrap;
                        background-color: ${Color.DEFAULT}; 
                        color: white; 
                        border-radius: 5px;
                        padding: .25rem 0;
                        width: 60px">
                        <div style="width: 100%; text-align: center; font-size: 11px; margin-bottom: 5px">${item.areaCode.shortAddress}</div>
                        <div style="width: 100%; text-align: center; font-size: 13px; margin-bottom: 5px; font-weight: 500">${(item.price / 10000).toFixed(1)}억</div>
                        <div style="width: 100%; text-align: center; font-size: 11px">${item.count.toLocaleString()}건</div>
                      </div>
                    `
                  }}
                />
              )
            })
          }
        </NaverMap>
      </NaverMapContainer>
    </NavermapsProvider>
  )
}

export default Map
