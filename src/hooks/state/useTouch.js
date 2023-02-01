import { useEffect, useState } from "react";
import { DragAction } from "../../constants";

const useTouch = ({ ref }) => {
  const [ dragStartPoint, setDragStartPoint ] = useState()
  const [ dragHeight, setDragHeight ] = useState(0)
  const [ action, setAction ] = useState(DragAction.IDLE)

  useEffect(() => {
    if (ref) {
      ref.current.ontouchstart = e => {
        const { clientY } = e.changedTouches[0]
        setAction(DragAction.HOLDING)
        setDragStartPoint(clientY)
      }
      ref.current.ontouchend = e => {
        const { clientY } = e.changedTouches[0]
        const height = dragStartPoint - clientY
        if (height > 0) {  //  Drag Up
          setAction(DragAction.UP)
        } else {
          setAction(DragAction.DOWN)
        }
        setDragHeight(height)
      }
    }
  })

  return [
    action,
    dragHeight
  ]
}

export default useTouch
