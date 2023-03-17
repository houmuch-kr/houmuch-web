import React from "react";
import { ClipLoader } from "react-spinners";
import { Color } from "~/constants";
import styled from "styled-components";
import { getBrowserHeight } from "~/utils";

const Styles = {
  Loader: styled.div<{
    fullScreen: boolean
    isEnableBackground: boolean
    margin?: string
  }>`
    position: ${({ fullScreen }) => fullScreen ? `absolute` : `relative`};
    width: 100%;
    height: ${({ fullScreen }) => fullScreen ? getBrowserHeight() : `100%`};
    display: flex;
    justify-content: center;
    align-items: center;
    margin: ${({ margin }) => margin ? margin : 0};
    z-index: 99999;
    background-color: ${({ isEnableBackground }) => isEnableBackground ? `rgba(255, 255, 255, .5)` : ``};
  `
}

interface Props {
  fullScreen?: boolean
  isEnableBackground?: boolean
  margin?: string
}

const Loader = ({ fullScreen = false, isEnableBackground = false, margin }: Props) => {
  return(
    <Styles.Loader fullScreen={fullScreen} isEnableBackground={isEnableBackground} margin={margin}>
      <ClipLoader loading={true} size={50} color={Color.DEFAULT} />
    </Styles.Loader>
  )
}

export default Loader
