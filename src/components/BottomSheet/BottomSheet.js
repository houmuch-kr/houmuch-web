import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useTouch } from "~/hooks/state";
import { DragAction } from "~/constants";

const Style = styled.div`
  position: absolute;
  width: 100vw;
  right: 0;
  bottom: ${({ height }) => height === 0 ? `-100px` : 0};
  background: white;
  border: 2px solid black;
  box-sizing: border-box;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom: 0;
  border-left: 1px solid black;
  border-right: 1px solid black;
  transition: all .3s ease;
  height: ${({ height }) => height ? height : '0px'};
`

const Holder = styled.span`
  width: 100%;
  height: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const HolderButton = styled.span`
  background-color: black;
  height: 6px;
  width: 50px;
  border-radius: 20px;
`

const height = {
  HIDE: 0,
  SIMPLE: '130px',
  DETAIL: '95vh'
}

const Content = styled.section`
`

export const BottomSheetMode = {
  HIDE: "HIDE",
  SIMPLE: "SIMPLE",
  DETAIL: "DETAIL"
}

const BottomSheet = ({ children, onModeChange }) => {
  const [ mode, setMode ] = useState(BottomSheetMode.SIMPLE)
  const ref = useRef()
  const [ action, dragHeight ] = useTouch({ ref })

  useEffect(() => {
    onModeChange && onModeChange(mode)
  }, [ mode ])

  useEffect(() => {
    if (action === DragAction.UP) {
      if (mode === BottomSheetMode.SIMPLE) {
        setMode(BottomSheetMode.DETAIL)
      }
    } else if (action === DragAction.DOWN) {
      if (mode === BottomSheetMode.SIMPLE) {
        setMode(BottomSheetMode.HIDE)
      } else if (mode === BottomSheetMode.DETAIL) {
        if (dragHeight < -200) {
          setMode(BottomSheetMode.HIDE)
        } else {
          setMode(BottomSheetMode.SIMPLE)
        }
      }
    }
  }, [ action ])

  return (
    <Style
      ref={ref}
      height={height[mode]}>
      <Holder>
        <HolderButton />
      </Holder>
      <Content>
        { children }
      </Content>
    </Style>
  )
}

export default BottomSheet
