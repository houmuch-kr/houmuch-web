import React from "react";
import { Container as NaverMapContainer, Marker, NaverMap, NavermapsProvider } from 'react-naver-maps'
import { Color } from "~/constants";
import { AreaCode } from "~/types";
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
  onBoundsChange?: (bounds: naver.maps.Bounds) => void
  onMarkerClick?: (markerAttribute: any) => void
  loading?: boolean
}

const Map = ({ defaultZoomLevel, onMarkerClick, markerItems, onZoomChange, onBoundsChange, loading = false }: Props) => {
  const handleMarkerClick = (markerAttribute: any) => () => {
    onMarkerClick && onMarkerClick(markerAttribute)
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
          onBoundsChanged={bounds => onBoundsChange && onBoundsChange(bounds)}
          defaultCenter={{ lat: 37.5666103, lng: 126.9783882 }}
          defaultZoom={defaultZoomLevel}>
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
                        <div style="width: 100%; text-align: center; font-size: 13px; margin-bottom: 5px; font-weight: 500">${(item.price / 1000).toFixed(1)}억</div>
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
