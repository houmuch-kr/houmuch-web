import React, { useEffect, useState } from "react"
import { BottomSheet, BottomSheetMode } from "~/components";
import ContractAreaSummaryContainer from "../../containers/contract/ContractAreaSummaryContainer";
import ContractAreaTrendContainer from "~/containers/contract/ContractAreaTrendContainer";
import ContractAreaListContainer from "~/containers/contract/ContractAreaListContainer";
import { TableContext, useTable } from "~/hooks";

interface Props {
  areaCode?: number
}

const ContractDetailBottomSheet = ({ areaCode }: Props) => {
  const [ currentMode, setCurrentMode ] = useState<BottomSheetMode>(BottomSheetMode.HIDE)
  const tableState = useTable({})

  useEffect(() => {
    if (areaCode) {
      setCurrentMode(BottomSheetMode.SIMPLE)
    } else {
      setCurrentMode(BottomSheetMode.HIDE)
    }
  }, [ areaCode ])

  const handleChangeMode = (mode: BottomSheetMode) => {
    setCurrentMode(mode)
  }

  return (
    <BottomSheet onModeChange={handleChangeMode} defaultMode={currentMode}>
      {
        areaCode && currentMode !== BottomSheetMode.HIDE && <ContractAreaSummaryContainer areaCode={areaCode} />
      }
      {
        areaCode && currentMode === BottomSheetMode.DETAIL && (
          <>
            <ContractAreaTrendContainer areaCode={areaCode} />
            <TableContext.Provider value={tableState}>
              <ContractAreaListContainer areaCode={areaCode} />
            </TableContext.Provider>
          </>
        )
      }
    </BottomSheet>
  )
}

export default ContractDetailBottomSheet
