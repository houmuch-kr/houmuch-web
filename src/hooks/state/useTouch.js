import { useEffect, useState } from "react";
import { DragAction } from "../../constants";

const useTouch = ({ ref }) => {
  const [ dragStartPoint, setDragStartPoint ] = useState()
  const [ dragHeight, setDragHeight ] = useState(0)
  const [ action, setAction ] = useState(DragAction.IDLE)

  const handleTouchEnd = e => {
    const { clientY } = e.changedTouches[0]
    const height = dragStartPoint - clientY
    if (height > 0) {  //  Drag Up
      setAction(DragAction.UP)
    } else {
      setAction(DragAction.DOWN)
    }
    setDragHeight(height)
  }

  const handleTouchStart = e => {
    const { clientY } = e.changedTouches[0]
    setAction(DragAction.HOLDING)
    setDragStartPoint(clientY)
  }

  useEffect(() => {
    const { addEventListener, removeEventListener } = ref.current
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
