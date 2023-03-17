import React from "react";
import { useHospitalListQuery } from "~/hooks";
import { Map } from "~/components";
import Loader from "../../components/Loader";

const HospitalListContainer = () => {
  const { boundsCoords, zoomLevel } = Map.useContext()
  const { data, isLoading } = useHospitalListQuery({ boundsCoords, enable: zoomLevel > 15 })

  if (data && data.data) {
    return (
      <Map.Markers
        markerItems={data?.data?.map(item => {
          return {
            coordinate: item.coordinate,
            icon: '../dist/images/hospital.png'
          }
        })}
      />
    )
  } else if (isLoading) {
    return <Loader fullScreen={true} isEnableBackground={true} />
  } else {
    return <></>
  }
}

export default HospitalListContainer
