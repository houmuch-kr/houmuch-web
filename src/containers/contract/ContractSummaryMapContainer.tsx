import React, { useEffect, useState } from "react";
import { AreaMarkerItem, BuildingMarkerItem, Map } from "~/components";
import { Coordinate } from "~/types";
import { useContractSummaryQuery } from "~/hooks";
import { Main } from "~/pages";

const ContractSummaryMapContainer = () => {
  const mainContext = Main.useContext()
  const DEFAULT_ZOOM_LEVEL = 9
  const DEFAULT_TYPE = 0
  const [ zoomLevel, setZoomLevel ] = useState<number>(DEFAULT_ZOOM_LEVEL)
  const [ type, setType ] = useState<number>(DEFAULT_TYPE)
  const [ boundsCoords, setBoundsCoords ] = useState<{ max: Coordinate, min: Coordinate }>()
  const { data, isLoading } = useContractSummaryQuery({ type, boundsCoords })

  useEffect(() => {
    const type = (() => {
      if (zoomLevel === 6) {
        return -1
      } else if (zoomLevel < 11) {
        return 0
      } else if (zoomLevel < 13) {
        return 1
      } else if (zoomLevel < 15) {
        return 2
      } else {
        return 3
      }
    })()
    setType(type)
  }, [ zoomLevel ])

  const handleMarkerClick = (marker: AreaMarkerItem | BuildingMarkerItem) => {
    let id
    let fetchType: 'AREA' | 'BUILDING'
    if (Object.hasOwn(marker, 'areaCode')) {
      fetchType = 'AREA'
      id = (marker as AreaMarkerItem).areaCode
    } else {
      fetchType = 'BUILDING'
      id = (marker as BuildingMarkerItem).building
    }
    mainContext.setFetchId(fetchType, id)
  }

  const handleBoundsChange = (bounds: { max: Coordinate, min: Coordinate }) => {
    setBoundsCoords(bounds)
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
