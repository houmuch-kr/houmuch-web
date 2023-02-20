import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface Context {
  page: number
  setPage: Dispatch<SetStateAction<number>>
}

export const TableContext = createContext<Context>({
  page: 0,
  setPage: () => {}
})

export const useTableContext = () => {
  return useContext(TableContext)
}
