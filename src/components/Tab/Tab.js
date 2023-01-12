
const Tab = ({ name, active, onClick }) => {
  return (
    <div className={"tab" + (active ? " active" : "")} onClick={() => onClick()}>
      <span>{ name }</span>
    </div>
  )
}

export default Tab