import { RefObject, useEffect } from "react";
import { isMobile } from "react-device-detect";

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
    const type = isMobile ? 'touchstart' : 'mousedown'
    addEventListener(type, handleClickOutside, true);
    return () => {
      removeEventListener(type, handleClickOutside, true);
    }
  }, [ onClick, ref ])
}

export default useClickOutsideOfElement
