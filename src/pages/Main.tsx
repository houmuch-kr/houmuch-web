import React, { createContext, useContext, useState } from "react";
import ContractDetailBottomSheet from "./sheets/ContractDetailBottomSheet";
import { PageTemplate } from "../components";
import ContractSummaryMap from "./ContractSummaryMap";
import { AreaCode, Building } from "~/types";

const MainContext = createContext<{
  id?: AreaCode | Building
  fetchType?: 'BUILDING' | 'AREA'
  setFetchId: (fetchType: 'BUILDING' | 'AREA' | undefined, id: AreaCode | Building | undefined) => void
}>({
  setFetchId: () => {}
})

const Main = () => {
  const [ id, setId ] = useState<AreaCode | Building>()
  const [ fetchType, setFetchType ] = useState<'BUILDING' | 'AREA'>()

  const handleChangeFetchId = (fetchType: 'BUILDING' | 'AREA' | undefined, id: AreaCode | Building | undefined) => {
    setFetchType(fetchType)
    setId(id)
  }

  return (
    <MainContext.Provider value={{
      id: id,
      fetchType: fetchType,
      setFetchId: handleChangeFetchId
    }}>
      <PageTemplate overflow={"hidden"}>
        <ContractSummaryMap />
        <ContractDetailBottomSheet />
      </PageTemplate>
    </MainContext.Provider>
  )
}

Main.Context = MainContext
Main.useContext = () => useContext(MainContext)

export default Main
