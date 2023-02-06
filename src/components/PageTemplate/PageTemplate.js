import styled from "styled-components";

const Style = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: ${({ overflow }) => overflow ? overflow : "auto"}
`

const PageTemplate = ({ children, overflow }) => {
  return (
    <Style overflow={overflow}>{ children }</Style>
  )
}

export default PageTemplate
