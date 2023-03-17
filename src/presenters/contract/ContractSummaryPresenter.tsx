import React, { ReactNode } from "react";
import styled from "styled-components";
import { Loader } from "~/components";

const Section = styled.div`
  padding: 0 1rem;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
  margin: .5rem auto;
  
  & > .title {
    font-weight: bold;
    font-size: 1.15rem;
    padding: 0;
    padding-bottom: 7.5px;
  }
  
  & > div {
    & > .row {
      display: flex;
      padding: .5rem 0;
      
      & > .label {
        width: 25%;
      }
      
      & > span {
        margin-right: 1rem;
      }
    }
  }
`

interface Props {
  children?: ReactNode
  isLoading: boolean
}

const ContractSummaryPresenter = ({ isLoading, children }: Props) => {
  if (isLoading) {
    return (
      <Section>
        <Loader margin={".75rem 0"} />
      </Section>
    )
  }
  return (
    <Section>{ children }</Section>
  )
}

export default ContractSummaryPresenter
