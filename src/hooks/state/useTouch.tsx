import { RefObject, useEffect, useState } from "react";
import { DragAction } from "~/constants";

interface Props {
  ref: RefObject<HTMLElement>
}

const useTouch = ({ ref }: Props) => {
  const [ dragStartPoint, setDragStartPoint ] = useState<number>(0)
  const [ dragHeight, setDragHeight ] = useState(0)
  const [ action, setAction ] = useState(DragAction.IDLE)

  const handleTouchEnd = (e: TouchEvent) => {
    if (e.target !== ref.current) {
      return
    }
    const { clientY } = e.changedTouches[0]
    const height = dragStartPoint - clientY
    if (height > 0) {  //  Drag Up
      setAction(DragAction.UP)
    } else {
      setAction(DragAction.DOWN)
    }
    setDragHeight(height)
  }

  const handleTouchStart = (e: TouchEvent) => {
    if (e.target !== ref?.current) {
      return
    }
    const { clientY } = e.changedTouches[0]
    setAction(DragAction.HOLDING)
    setDragStartPoint(clientY)
  }

  useEffect(() => {
    const { addEventListener, removeEventListener } = ref.current!!
    if (ref) {
      addEventListener('touchstart', handleTouchStart)
      addEventListener('touchend', handleTouchEnd)
    }
    return () => {
      removeEventListener('touchstart', handleTouchStart)
      removeEventListener('touchend', handleTouchEnd)
    }
  })

  return [
    action,
    dragHeight
  ]
}

export default useTouch
