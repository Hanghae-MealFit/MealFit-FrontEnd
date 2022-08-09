import React from 'react'

const HourSelect = () => {

  const value = React.useRef("")

  const check = () => {
    console.log(value.current.value)
  }

  return (
    <select onChange = {check} ref = {value} defaultValue="default" id="Hour" name="Hour">
      <option value="default" disabled>시간을 선택하세요</option>
      { 
        Array.from({ length: 24 }, (item, index) => {
        return <option value = {(index < 10 ? "0" + index : index) + "Hour"} key = {(index < 10 ? "0" + index : index) + "Hour"}> {index < 10 ? "0" + index : index}시</option>
        })
      }
    </select>
  )
}

export default HourSelect