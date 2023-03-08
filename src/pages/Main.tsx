import React, { useState } from "react";
import ContractDetailBottomSheet from "./sheets/ContractDetailBottomSheet";
import { PageTemplate } from "../components";
import ContractSummaryMapContainer from "../containers/contract/ContractSummaryMapContainer";
import { AreaCode, Building } from "~/types";

const Main = () => {
  const [ fetchType, setFetchType ] = useState<'BUILDING' | 'AREA'>()
  const [ id, setId ] = useState<AreaCode | Building>()

  const handleChangeFetchId = (fetchType: 'BUILDING' | 'AREA', id: AreaCode | Building) => {
    setFetchType(fetchType)
    setId(id)
  }

  return (
    <PageTemplate overflow={"hidden"}>
      <ContractSummaryMapContainer onChange={handleChangeFetchId} />
      <ContractDetailBottomSheet type={fetchType} id={id} />
    </PageTemplate>
  )
}

export default Main
