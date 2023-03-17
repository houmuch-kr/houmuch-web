import './App.scss';
import React from "react"
import { Main } from "~/pages";
import styled from "styled-components";

const Styles = {
  App: styled.div`
    
  `
}

function App() {
  return (
    <Styles.App className="app">
      <Main />
    </Styles.App>
  )
}

export default App;
