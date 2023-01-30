import React, { useState } from "react";
import styled from "styled-components";

const Style = styled.div`
  position: absolute;
  width: 100vw;
  right: 0;
  bottom: 0;
  background: white;
  border: 1px solid black;
  border-bottom: 0;
  transition: all .5s ease;
  height: ${({ height }) => height ? height : '0px'};
`

const height = {
  HIDE: 0,
  SIMPLE: '100px',
  DETAIL: '90vh'
}

/**
 * @param mode (HIDE, SIMPLE, DETAIL) 표시 정도에 따라 구분
 * @returns {JSX.Element}
 * @constructor
 */
const BottomSheet = () => {
  const [ mode, setMode ] = useState("SIMPLE")
  return (
    <Style height={height[mode]}>

    </Style>
  )
}

export default BottomSheet
