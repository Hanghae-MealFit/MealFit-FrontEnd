import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import "../css/rechart.css"

const Rechart = ({weight}) => {

  const weightData = (weight.sort((a,b) => a.id - b.id)).map((v, idx) => {
    return {
      날짜 : ((v.savedDate).split("-").slice(1, 3).join("/")),
      몸무게 : v.weight
    }
  })

  return (
    <ResponsiveContainer width="100%" height="70%">
      <AreaChart
        width={400}
        height={300}
        data={weightData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="날짜" style={{ fontSize: "10px" }} />
        <YAxis style={{ fontSize: "10px" }} />
        <Tooltip />
        <Area type="monotone" dataKey="몸무게" stroke="#FE7770" fill="#FFB0AC" style={{ fontSize: "10px" }} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default Rechart