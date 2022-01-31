import { width } from '@mui/system'
import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'

import { useSelector } from 'react-redux'

import company from '../reducers/company'

const PieChart1 = () => {
  const genderRatio = useSelector((store) => store.company.genderRatio)
  const pieData = [
    { title: 'Women', value: genderRatio, color: 'pink' },
    { title: 'Men', value: 100 - genderRatio, color: 'black' },
  ]

  return (
    <div>
      <PieChart
        style={{ height: '100px', width: '200px' }}
        data={pieData}
        //totalValue={100}
        startAngle={-90}
        lineWidth={70} //bredd
        paddingAngle={2}
        animate={true}
        label={({ dataEntry }) =>
          dataEntry.title + ': ' + dataEntry.value + '%'
        }
        labelPosition={112}
        center={[70, 70]}
        y
        viewBoxSize={[150, 150]}
        labelStyle={{
          fill: '#444',
          fontSize: '1rem',
          fontFamily: 'sans-serif',
        }}
        // your data

        // width and height of the view box
        //viewBoxSize={[400, 400]}
      />
    </div>
  )
}

export default PieChart1
