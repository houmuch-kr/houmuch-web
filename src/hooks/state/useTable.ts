import { useState } from "react";

interface Props {
  defaultPage?: number
}

const useTable = ({ defaultPage = 0 }: Props) => {
  const [ page, setPage ] = useState<number>(defaultPage)
  return {
    page,
    setPage
  }
}

export default useTable
