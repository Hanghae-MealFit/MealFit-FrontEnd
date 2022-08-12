import React from 'react'

const StartMinuteSelect = ({ startMinute }) => {

  return (
    <select ref={startMinute} defaultValue="default" id="StartMinute" name="StartMinute">
      <option value="default" disabled>분</option>
      { 
        Array.from({ length: 60 }, (item, index) => {
        return <option value = {(index < 10 ? "0" + index : index)} key = {(index < 10 ? "0" + index : index) + "Minute"}> {index < 10 ? "0" + index : index}분</option>
        })
      }
    </select>
  )
}

export default StartMinuteSelect