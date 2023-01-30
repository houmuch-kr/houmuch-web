const InputText = ({ type, id, name, label, onChange }) => {
  const handleChange = e => {
    console.log("111--->" + e.target)
    console.log("222--->" + e.target.value)
    onChange && onChange(e.target.value)
  }

  return (
    <div className={"input"}>
      <input type={type} id={id} name={name} onChange={handleChange} placeholder={label} />
    </div>
  )
}

export default InputText