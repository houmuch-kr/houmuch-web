import React from "react";
import { renderToString } from "react-dom/server";
import styled from "styled-components";

interface Props {
  map?: naver.maps.Map
  onClick?: () => void
  icon?: string
  position: {
    top: any,
    bottom: any,
    right: any
  },
}

const Styles = {
  Button: styled.button<{
    top: any,
    bottom: any,
    right: any
  }>`
    border-top: 0.25px solid black;
    border: .5px solid black;
    width: 36px;
    height: 36px;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 99999;
    top: ${({ top }) => top};
    right: ${({ right }) => right};
    bottom: ${({ bottom }) => bottom};
  `,
  Icon: styled.span`
    color: black;
  `
}

const MapControl = ({ icon, position: { top, right, bottom } }: Props) => {
  return (
    <Styles.Button top={top} right={right} bottom={bottom}>
      <Styles.Icon className="material-symbols-outlined">{ icon }</Styles.Icon>
    </Styles.Button>
  )
}

const setMapControl = ({ map, onClick, icon, position }: Props) => {
  const { CustomControl, Position, Event } = naver.maps
  const mapControl = new CustomControl(renderToString(<MapControl onClick={onClick} position={position} icon={icon} />), {
    position: Position.RIGHT_TOP
  })
  Event.addDOMListener(mapControl.getElement(), "click", () => {
    onClick && onClick()
  })
  mapControl.setMap(map)
  return mapControl
}

export { setMapControl }
export default MapControl
