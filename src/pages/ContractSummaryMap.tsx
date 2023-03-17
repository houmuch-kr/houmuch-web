import React from "react";
import { Map } from "~/components";
import { ContractSummaryContainer } from "~/containers";
import HospitalListContainer from "../containers/hospital/HospitalListContainer";

const ContractSummaryMap = () => {
  const DEFAULT_ZOOM_LEVEL = 9
  return (
    <Map defaultZoomLevel={DEFAULT_ZOOM_LEVEL}>
      <ContractSummaryContainer />
      <HospitalListContainer />
    </Map>
  )
}

export default ContractSummaryMap
