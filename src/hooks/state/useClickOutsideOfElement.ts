import { RefObject, useEffect } from "react";

interface Props<T> {
  ref: RefObject<T>
  onClick: () => void
}

const useClickOutsideOfElement = <T extends HTMLElement>({ ref, onClick }: Props<T>) => {
  useEffect(() => {
    const { addEventListener, removeEventListener } = document
    const handleClickOutside = (e: any) => {
      if (ref && !ref.current?.contains(e.target)) {
        onClick && onClick()
      }
    }
    addEventListener('mousedown', handleClickOutside, true);
    return () => {
      removeEventListener('mousedown', handleClickOutside, true);
    }
  }, [ onClick, ref ])
}

export default useClickOutsideOfElement
