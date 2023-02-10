import React from "react";
import ContractDetailBottomSheet from "./sheets/ContractDetailBottomSheet";
import { PageTemplate } from "../components";

const Main = () => {
  return (
    <PageTemplate overflow={"hidden"}>
      <ContractDetailBottomSheet />
    </PageTemplate>
  )
}

export default Main
