import React from 'react'

const StartHourSelect = ({ startHour }) => {

  return (
    <select ref={startHour} defaultValue="default" id="StartHour" name="StartHour">
      <option value="default" disabled>시간을 선택하세요</option>
      { 
        Array.from({ length: 24 }, (item, index) => {
        return <option value = {(index < 10 ? "0" + index : index) + "H"} key = {(index < 10 ? "0" + index : index) + "Hour"}> {index < 10 ? "0" + index : index}시</option>
        })
      }
    </select>
  )
}

export default StartHourSelect