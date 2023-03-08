import React, { useEffect, useState } from "react"
import { BottomSheet, BottomSheetMode } from "~/components";
import { TableContext, useTable } from "~/hooks";
import { AreaCode, Building } from "~/types";
import {
  ContractAreaListContainer,
  ContractAreaSummaryContainer,
  ContractAreaTrendContainer,
  ContractBuildingListContainer,
  ContractBuildingSummaryContainer,
  ContractBuildingTrendContainer
} from "~/containers";

interface Props {
  type?: 'BUILDING' | 'AREA'
  id?: AreaCode | Building
}

const ContractDetailBottomSheet = ({ type, id }: Props) => {
  const [ currentMode, setCurrentMode ] = useState<BottomSheetMode>(BottomSheetMode.HIDE)
  const tableState = useTable({})

  useEffect(() => {
    if (id) {
      setCurrentMode(BottomSheetMode.SIMPLE)
    } else {
      setCurrentMode(BottomSheetMode.HIDE)
    }
  }, [ id ])

  const handleChangeMode = (mode: BottomSheetMode) => {
    setCurrentMode(mode)
  }

  return (
    <BottomSheet onModeChange={handleChangeMode} defaultMode={currentMode}>
      {
        type === 'AREA' ? (
          <>
            {
              id && currentMode !== BottomSheetMode.HIDE && <ContractAreaSummaryContainer areaCode={id as AreaCode} />
            }
            {
              id && currentMode === BottomSheetMode.DETAIL && (
                <>
                  <ContractAreaTrendContainer areaCode={id as AreaCode} />
                  <TableContext.Provider value={tableState}>
                    <ContractAreaListContainer areaCode={id as AreaCode} />
                  </TableContext.Provider>
                </>
              )
            }
          </>
        ) : (
          <>
            {
              id && currentMode !== BottomSheetMode.HIDE && <ContractBuildingSummaryContainer building={id as Building} />
            }
            {
              id && currentMode === BottomSheetMode.DETAIL && (
                <>
                  <ContractBuildingTrendContainer building={id as Building} />
                  <TableContext.Provider value={tableState}>
                    <ContractBuildingListContainer building={id as Building} />
                  </TableContext.Provider>
                </>
              )
            }
          </>
        )
      }
    </BottomSheet>
  )
}

export default ContractDetailBottomSheet
