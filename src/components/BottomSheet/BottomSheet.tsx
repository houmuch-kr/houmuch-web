import React, { ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useTouch } from "~/hooks/state";
import { DragAction } from "~/constants";
import useClickOutsideOfElement from "../../hooks/state/useClickOutsideOfElement";

const Styles = {
  BottomSheet: styled.div<{
    height: string
  }>`
    position: absolute;
    width: 100vw;
    right: 0;
    bottom: ${({ height }) => height === '0px' ? `-100px` : 0};
    background: white;
    box-sizing: border-box;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border: 1px solid black;
    border-top-width: 2px;
    border-bottom-width: 0;
    transition: all .3s ease;
    height: ${({ height }) => height ? height : '0px'};
  `,
  Holder: styled.span`
    width: 100%;
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  HolderButton: styled.span`
    background-color: black;
    height: 6px;
    width: 50px;
    border-radius: 20px;
  `,
  Content: styled.section`
    height: calc(100% - 15px);
    overflow-y: auto;
  `,
  height: {
    HIDE: '0px',
    SIMPLE: '130px',
    DETAIL: '95vh'
  }
}

export enum BottomSheetMode {
  HIDE = "HIDE",
  SIMPLE = "SIMPLE",
  DETAIL = "DETAIL"
}

interface Props {
  children: ReactNode
  onModeChange: (mode: BottomSheetMode) => void
  defaultMode: BottomSheetMode
}

const BottomSheet = ({ children, onModeChange, defaultMode }: Props) => {
  const bottomSheetRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLElement>(null)
  const [ mode, setMode ] = useState(BottomSheetMode.HIDE)
  const [ action, dragHeight ] = useTouch({ ref })

  useClickOutsideOfElement({
    ref: bottomSheetRef,
    onClick: () => setMode(BottomSheetMode.HIDE),
  })

  useEffect(() => {
    onModeChange && onModeChange(mode)
  }, [ mode ])

  useEffect(() => {
    setMode(defaultMode)
  }, [ defaultMode ])

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
    <Styles.BottomSheet
      ref={bottomSheetRef}
      height={Styles.height[mode]}>
      <Styles.Holder ref={ref}>
        <Styles.HolderButton />
      </Styles.Holder>
      <Styles.Content>
        { children }
      </Styles.Content>
    </Styles.BottomSheet>
  )
}

export default BottomSheet
