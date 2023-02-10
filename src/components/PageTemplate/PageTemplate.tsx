import styled from "styled-components";
import { ReactNode } from "react";

const Styles = {
  PageTemplate: styled.section<{
    overflow?: string
  }>`
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: ${({ overflow }) => overflow ? overflow : "auto"}
  `
}

interface Props {
  children: ReactNode
  overflow?: string
}

const PageTemplate = ({ children, overflow }: Props) => {
  return (
    <Styles.PageTemplate overflow={overflow}>{ children }</Styles.PageTemplate>
  )
}

export default PageTemplate
