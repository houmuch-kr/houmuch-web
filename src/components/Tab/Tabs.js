import Tab from "./Tab"
import React, {useState} from "react";

const Tabs = ({ tabs }) => {
  const [ tabIndex, setTabIndex ] = useState(0);

  const handleClickTab = index => {
    setTabIndex(index)
  }

  return (
    <>
      <div className={"tabs"}>
        {
          tabs.map(({ name }, index) => {
            return (
              <Tab name={name} active={tabIndex === index} onClick={() => handleClickTab(index)} />
            )
          })
        }
      </div>
      {
        tabs.filter((_, index) => tabIndex === index)
          .map(({ content }, index) => {
            return content()
          })
      }
    </>
  )
}

export default Tabs