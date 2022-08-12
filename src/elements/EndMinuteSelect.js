import React from 'react'
import styled from 'styled-components'

const EndMinuteSelect = ({ endMinute }) => {

  return (
    <Select ref={endMinute} defaultValue="default" id="EndMinute" name="EndMinute">
      <option value="default" disabled>분</option>
      { 
        Array.from({ length: 60 }, (item, index) => {
        return <option value = {(index < 10 ? "0" + index : index)} key = {(index < 10 ? "0" + index : index) + "Minute"}> {index < 10 ? "0" + index : index}분</option>
        })
      }
    </Select>
  )
}

const Select = styled.select`
  width: 60px;
  height: 30px;
  border: none;
  border-bottom: 1px solid #9A9A9A;
  outline: none;
  padding: 0 4px;
  box-sizing: border-box;
  font-family: 'GmarketM', 'sans-serif';
  font-size: 12px;
`

export default EndMinuteSelect