import React, { useState } from "react";
import ContractDetailBottomSheet from "./sheets/ContractDetailBottomSheet";
import { PageTemplate } from "../components";
import ContractSummaryMapContainer from "../containers/contract/ContractSummaryMapContainer";

const Main = () => {
  const [ areaCode, setAreaCode ] = useState<number | undefined>(undefined)

  return (
    <PageTemplate overflow={"hidden"}>
      <ContractSummaryMapContainer onChange={areaCode => setAreaCode(areaCode)} />
      <ContractDetailBottomSheet areaCode={areaCode} />
    </PageTemplate>
  )
}

export default Main
