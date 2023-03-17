import styled from "styled-components";
import { ReactNode, useEffect, useState } from "react";

const Styles = {
  PageTemplate: styled.section<{
    overflow?: string;
    height?: string
  }>`
    position: relative;
    width: 100%;
    height: ${({ height }) => height};
    overflow: ${({ overflow }) => overflow ? overflow : "auto"}
  `
}

interface Props {
  children: ReactNode
  overflow?: string
}

const PageTemplate = ({ children, overflow }: Props) => {
  const [ height, setHeight ] = useState("100vh")

  useEffect(() => {
    const { innerHeight } = window;
    setHeight(`${innerHeight}px`)
  }, [])

  return (
    <Styles.PageTemplate overflow={overflow} height={height}>{ children }</Styles.PageTemplate>
  )
}

export default PageTemplate
