import React from 'react'
import styled from 'styled-components'

const EndHourSelect = ({ endHour }) => {

  return (
    <Select ref={endHour} defaultValue="default" id="EndHour" name="EndHour">
      <option value="default" disabled>시간</option>
      { 
        Array.from({ length: 24 }, (item, index) => {
        return <option value = {(index < 10 ? "0" + index : index)} key = {(index < 10 ? "0" + index : index) + "Hour"}> {index < 10 ? "0" + index : index}</option>
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
  text-align: center;
`

export default EndHourSelect