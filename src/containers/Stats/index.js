import React, { Component } from 'react'
import { LineChart, Line, XAxis, YAxis } from 'recharts'

class Stats extends Component {
  render() {
    const data = [
      { name: '17/12/2018', value: 2 },
      { name: '18/12/2018', value: 6 },
      { name: '19/12/2018', value: 4 },
      { name: '20/12/2018', value: 4 },
      { name: '21/12/2018', value: 10 }
    ]

    return (
      <div>
        <LineChart width={600} height={300} data={data}>
          <Line type="monotone" dataKey="value" stroke="red" />
          <XAxis dataKey="name" />
          <YAxis />
        </LineChart>
      </div>
    )
  }
}

export default Stats
