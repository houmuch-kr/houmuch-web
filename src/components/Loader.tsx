import React from "react";
import { ClipLoader } from "react-spinners";
import { Color } from "~/constants";
import styled from "styled-components";

const Styles = {
  Loader: styled.div<{
    fullScreen: boolean
    isEnableBackground: boolean
  }>`
    position: ${({ fullScreen }) => fullScreen ? `absolute` : `relative`};
    width: 100%;
    height: ${({ fullScreen }) => fullScreen ? `100vh` : `100%`};
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.25rem 0;
    z-index: 99999;
    background-color: ${({ isEnableBackground }) => isEnableBackground ? `rgba(255, 255, 255, .5)` : ``};
  `
}

interface Props {
  fullScreen?: boolean
  isEnableBackground?: boolean
}

const Loader = ({ fullScreen = false, isEnableBackground = false }: Props) => {
  return(
    <Styles.Loader fullScreen={fullScreen} isEnableBackground={isEnableBackground}>
      <ClipLoader loading={true} size={50} color={Color.DEFAULT} />
    </Styles.Loader>
  )
}

export default Loader
