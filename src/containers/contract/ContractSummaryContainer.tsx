import React, { useEffect, useState } from "react";
import { useContractSummaryQuery } from "~/hooks";
import { AreaMarkerItem, BuildingMarkerItem, Map, SummaryMarkerItem } from "~/components";
import { Main } from "~/pages";
import Loader from "../../components/Loader";

const ContractSummaryContainer = () => {
  const DEFAULT_TYPE = 0
  const [ type, setType ] = useState<number>(DEFAULT_TYPE)
  const { boundsCoords, zoomLevel } = Map.useContext()
  const mainContext = Main.useContext()
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

  const handleMarkerClick = (marker: SummaryMarkerItem) => {
    if (Object.hasOwn(marker, 'areaCode')) {
      mainContext.setFetchId('AREA', (marker as AreaMarkerItem).areaCode)
    } else {
      mainContext.setFetchId('BUILDING', (marker as BuildingMarkerItem).building)
    }
  }

  if (data && data.data) {
    if (type < 3) {
      return <Map.AreaMarkers
        onMarkerClick={handleMarkerClick}
        markerItems={data?.data?.map(item => item as AreaMarkerItem)}
      />
    } else {
      return <Map.BuildingMarkers
        onMarkerClick={handleMarkerClick}
        markerItems={data?.data?.map(item => item as BuildingMarkerItem)}
      />
    }
  } else {
    return <Loader fullScreen={true} isEnableBackground={true} />
  }
}

export default ContractSummaryContainer
