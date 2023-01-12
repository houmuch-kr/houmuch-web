import React from "react";

const TabContent = ({ children, show }) => {
  return (
    <div className={"tabContent"}>
      { children }
    </div>
  )
}

export default TabContent