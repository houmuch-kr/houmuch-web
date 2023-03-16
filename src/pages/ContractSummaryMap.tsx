import React from "react";
import { Map } from "~/components";
import { ContractSummaryContainer } from "~/containers";

const ContractSummaryMap = () => {
  const DEFAULT_ZOOM_LEVEL = 9

  return (
    <Map defaultZoomLevel={DEFAULT_ZOOM_LEVEL}>
      <ContractSummaryContainer />
    </Map>
  )
}

export default ContractSummaryMap
