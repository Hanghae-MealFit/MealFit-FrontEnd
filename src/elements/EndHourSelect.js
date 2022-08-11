import React from 'react'

const EndHourSelect = ({ endHour }) => {

  return (
    <select ref={endHour} defaultValue="default" id="EndHour" name="EndHour">
      <option value="default" disabled>시간을 선택하세요</option>
      { 
        Array.from({ length: 24 }, (item, index) => {
        return <option value = {(index < 10 ? "0" + index : index)} key = {(index < 10 ? "0" + index : index) + "Hour"}> {index < 10 ? "0" + index : index}시</option>
        })
      }
    </select>
  )
}

export default EndHourSelect