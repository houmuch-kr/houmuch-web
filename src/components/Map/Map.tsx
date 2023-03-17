import React, { createContext, ReactNode, useContext, useState } from "react";
import {
  Container as NaverMapContainer,
  Listener,
  Marker,
  NaverMap,
  NavermapsProvider,
  Polygon
} from 'react-naver-maps'
import { AreaCode, Building, Coordinate } from "~/types";
import "./Map.scss"

export interface MarkerItem {
  coordinate: Coordinate,
  icon: string
  key?: string
}

export interface SummaryMarkerItem {
  price: number
  count: number
}

export interface AreaMarkerItem extends SummaryMarkerItem {
  areaCode: AreaCode
}

export interface BuildingMarkerItem extends SummaryMarkerItem {
  building: Building
}

interface Props {
  defaultZoomLevel: number
  markerItems?: Array<AreaMarkerItem | BuildingMarkerItem>
  onZoomChange?: (zoom: number) => void
  onBoundsChange?: (bounds: { max: Coordinate, min: Coordinate }) => void
  onMarkerClick?: (marker: SummaryMarkerItem) => void
  children?: ReactNode
}

const MapContext = createContext<{
  boundsCoords?: {
    max: Coordinate,
    min: Coordinate
  },
  zoomLevel: number
}>({ zoomLevel: 0 })

const Map = ({ defaultZoomLevel, onZoomChange, children }: Props) => {
  const [ boundsCoords, setBoundsCoords ] = useState<{ max: Coordinate, min: Coordinate }>()
  const [ zoomLevel, setZoomLevel ] = useState<number>(defaultZoomLevel)

  const handleBoundsChange = (bounds: naver.maps.Bounds) => {

  }

  const handleZoomChange = (zoomLevel: number) => {
    setZoomLevel(zoomLevel)
  }

  const convertBounds = (bounds: naver.maps.Bounds): { max: Coordinate, min: Coordinate } => {
    const max = bounds.getMax()
    const min = bounds.getMin()
    return {
      max: { latitude: max.y, longitude: max.x },
      min: { latitude: min.y, longitude: min.x },
    }
  }

  const handleInit = (e: any, { bounds }: naver.maps.MapOptions) => {
    setBoundsCoords(convertBounds(bounds as naver.maps.Bounds))
  }

  const handleIdle = (e: any, { bounds }: naver.maps.MapOptions) => {
    setBoundsCoords(convertBounds(bounds as naver.maps.Bounds))
  }

  return (
    <MapContext.Provider value={{
      boundsCoords,
      zoomLevel: zoomLevel
    }}>
      <NavermapsProvider ncpClientId={process.env.NCP_CLIENT_ID || "e5njzmk0hi"}>
        <NaverMapContainer
          id={'map'}
          className={'map'}
          style={{ width: '100%', height: '100%', borderTop: 'transparent' }}>
          <NaverMap
            onZoomChanged={handleZoomChange}
            onBoundsChanged={handleBoundsChange}
            defaultCenter={{ lat: 37.5666103, lng: 126.9783882 }}
            defaultZoom={defaultZoomLevel}>
            <Listener type={"init"} listener={handleInit} />
            <Listener type={"idle"} listener={handleIdle} />
            { children }
          </NaverMap>
        </NaverMapContainer>
      </NavermapsProvider>
    </MapContext.Provider>
  )
}

Map.Polygons = ({ polygons }: {
  polygons: Array<Array<any>>
}) => {
  return polygons.map(polygonList => (
    <Polygon
      fillColor={'red'}
      fillOpacity={0.05}
      strokeColor={'red'}
      strokeOpacity={0.6}
      strokeWeight={3}
      paths={polygonList.map(polygon => {
        return polygon.map((item: Array<any>) => new naver.maps.LatLng(item[1], item[0]))
      })}
    />
  ))
}

Map.BuildingMarkers = ({ markerItems, onMarkerClick }: {
  markerItems: Array<BuildingMarkerItem>
  onMarkerClick?: (markerItem: BuildingMarkerItem) => void
}) => {
  const handleMarkerClick = (markerItem: BuildingMarkerItem) => () => {
    onMarkerClick && onMarkerClick(markerItem)
  }
  return (
    <>
      {
        markerItems.map(item => {
          const { price, count } = item
          const { name, coordinate } = item.building
          const { latitude, longitude } = coordinate
          return (
            <Marker
              position={new window.naver.maps.LatLng({ lat: latitude, lng: longitude })}
              onClick={handleMarkerClick(item)}
              zIndex={10000}
              icon={{
                content: count !== 0 ? `
                  <div class="marker building">
                    <div class="markerLabel title">${name}</div>
                    <div class="markerLabel price">${(price / 10000).toFixed(1)}억</div>
                    <div class="markerLabel count">${count.toLocaleString()}건</div>
                  </div>
                ` : ``
              }}
            />
          )
        })
      }
    </>
  )
}

Map.AreaMarkers = ({ markerItems, onMarkerClick }: {
  markerItems: Array<AreaMarkerItem>
  onMarkerClick?: (markerItem: AreaMarkerItem) => void
}) => {
  const handleMarkerClick = (markerItem: AreaMarkerItem) => () => {
    onMarkerClick && onMarkerClick(markerItem)
  }
  return (
    <>
      {
        markerItems.map(item => {
          const { price, count } = item
          const { latitude, longitude } = item.areaCode.coordinate
          return (
            <Marker
              position={new window.naver.maps.LatLng({ lat: latitude, lng: longitude })}
              onClick={handleMarkerClick(item)}
              zIndex={10000}
              icon={{
                content: count !== 0 ? `
                  <div class="marker area">
                    <div class="markerLabel address">${item.areaCode.shortAddress}</div>
                    <div class="markerLabel price">${(price / 10000).toFixed(1)}억</div>
                    <div class="markerLabel count">${count.toLocaleString()}건</div>
                  </div>
                ` : `
                  <div class="marker area empty">
                    <div style="width: 100%; text-align: center; font-size: 11px;">${item.areaCode.shortAddress}</div>
                  </div>
                `
              }}
            />
          )
        })
      }
    </>
  )
}

Map.Markers = ({ markerItems, onMarkerClick }: {
  markerItems: Array<MarkerItem>
  onMarkerClick?: (markerItem: MarkerItem) => void
}) => {
  const handleMarkerClick = (markerItem: MarkerItem) => () => {
    onMarkerClick && onMarkerClick(markerItem)
  }
  return (
    <>
      {
        markerItems.map(item => {
          const { icon } = item
          const { latitude, longitude } = item.coordinate
          return (
            <Marker
              position={new window.naver.maps.LatLng({ lat: latitude, lng: longitude })}
              onClick={handleMarkerClick(item)}
              icon={{
                content: `
                  <div class="marker icon">
                    <img class="markerIcon" src="${icon}" alt="아이콘" />
                  </div>
                `
              }}
            />
          )
        })
      }
    </>
  )
}

Map.Context = MapContext
Map.useContext = () => useContext(MapContext)

export default Map
