import React, { ReactNode, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useTouch } from "~/hooks/state";
import { DragAction } from "~/constants";
import useClickOutsideOfElement from "../../hooks/state/useClickOutsideOfElement";
import { isMobile } from "react-device-detect";

const Styles = {
  BottomSheet: styled.div<{
    width: string
    height: string
  }>`
    position: absolute;
    width: ${({ width }) => width};
    right: 0;
    left: 0;
    bottom: ${({ height }) => height === '0px' ? `-100px` : 0};
    background: white;
    box-sizing: border-box;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    box-shadow: 0 0 4px 2px #c8c8c8;
    border-top-width: 2px;
    margin: 0 auto;
    border-bottom-width: 0;
    transition: all .3s ease;
    height: ${({ height }) => height ? height : '0px'};
  `,
  Holder: styled.span`
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: center;
    padding-top: 5px;
  `,
  HolderButton: styled.span`
    background-color: black;
    height: 7.5px;
    width: 50px;
    border-radius: 20px;
  `,
  Content: styled.section`
    height: calc(100% - 30px);
    overflow-y: auto;
  `,
  height: {
    HIDE: '0px',
    SIMPLE: '130px',
    DETAIL: '95%'
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
  onClickOutside?: () => void
}

const BottomSheet = ({ children, onModeChange, defaultMode, onClickOutside }: Props) => {
  const bottomSheetRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLElement>(null)
  const [ mode, setMode ] = useState(BottomSheetMode.HIDE)
  const [ action, dragHeight ] = useTouch({ ref })

  useClickOutsideOfElement({
    ref: bottomSheetRef,
    onClick: () => {
      setMode(BottomSheetMode.HIDE)
      onClickOutside && onClickOutside()
    },
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
      width={isMobile ? '100vw' : '500px'}
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
