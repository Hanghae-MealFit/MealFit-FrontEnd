import React from 'react'

const MinuteSelect = () => {

  const value = React.useRef("")
  
  const check = () => {
    console.log(value.current.value)
  }

  return (
    <select onChange = {check} ref = {value} defaultValue="default" id="Minute" name="Minute">
      <option value="default" disabled>분을 선택하세요</option>
      { 
        Array.from({ length: 60 }, (item, index) => {
        return <option value = {(index < 10 ? "0" + index : index) + "Minute"} key = {(index < 10 ? "0" + index : index) + "Minute"}> {index < 10 ? "0" + index : index}분</option>
        })
      }
    </select>
  )
}

export default MinuteSelect