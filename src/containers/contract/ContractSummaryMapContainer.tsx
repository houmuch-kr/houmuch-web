import React, { useEffect, useState } from "react";
import { Map } from "~/components";
import { useContractSummaryQuery } from "~/hooks";

interface Props {
  onChange: (areaCode: number) => void
}

const ContractSummaryMapContainer = ({ onChange }: Props) => {
  const DEFAULT_ZOOM_LEVEL = 9
  const DEFAULT_TYPE = 0
  const [ zoomLevel, setZoomLevel ] = useState<number>(DEFAULT_ZOOM_LEVEL)
  const [ type, setType ] = useState<number>(DEFAULT_TYPE)
  const { data, isLoading } = useContractSummaryQuery(type)

  useEffect(() => {
    const type = (() => {
      if (zoomLevel === 6) {
        return -1
      } else if (zoomLevel < 11) {
        return 0
      } else if (zoomLevel < 13) {
        return 1
      } else {
        return 2
      }
    })()
    setType(type)
  }, [ zoomLevel ])

  const handleMarkerClick = (markerAttribute: any) => {
    const { areaCode } = markerAttribute
    onChange && onChange(areaCode.id)
  }

  const handleBoundsChange = (bounds: naver.maps.Bounds) => {

  }

  const handleZoomChange = (zoomLevel: number) => {
    setZoomLevel(zoomLevel)
  }

  return (
    <Map
      loading={isLoading}
      markerItems={data?.data}
      defaultZoomLevel={DEFAULT_ZOOM_LEVEL}
      onZoomChange={handleZoomChange}
      onMarkerClick={handleMarkerClick}
      onBoundsChange={handleBoundsChange} />
  )
}

export default ContractSummaryMapContainer
