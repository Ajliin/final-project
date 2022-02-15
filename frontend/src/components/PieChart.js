import React from 'react'
import { useSelector } from 'react-redux'

import { PieChart } from 'react-minimal-pie-chart'

export const PieChart1 = () => {
  const genderRatio = useSelector((store) => store.company.genderRatio)

  const pieData = [
    { title: 'Women', value: genderRatio, color: '#ff6600' },
    { title: 'Men', value: 100 - genderRatio, color: '#c43300' },
  ]

  return (
    <div>
      <PieChart
        style={{ height: '100px', width: '200px' }}
        data={pieData}
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
      />
    </div>
  )
}

export const PieChart2 = () => {
  const genderRatioSearchedCompany = useSelector(
    (store) => store.searchedCompany.genderRatio,
  )
  const pieData = [
    { title: 'Women', value: genderRatioSearchedCompany, color: '#ff6600' },
    { title: 'Men', value: 100 - genderRatioSearchedCompany, color: '#c43300' },
  ]

  return (
    <div>
      <PieChart
        style={{ height: '100px', width: '200px' }}
        data={pieData}
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
      />
    </div>
  )
}

export const PieChart3 = ({ genderRatio }) => {
  const pieData = [
    { title: 'Women', value: genderRatio, color: '#ff6600' },
    { title: 'Men', value: 100 - genderRatio, color: '#c43300' },
  ]

  return (
    <div>
      <PieChart
        style={{ height: '100px', width: '200px' }}
        data={pieData}
        startAngle={-90}
        lineWidth={70} //bredd
        paddingAngle={2}
        animate={true}
        label={({ dataEntry }) =>
          dataEntry.title + ': ' + dataEntry.value + '%'
        }
        labelPosition={110}
        center={[70, 70]}
        y
        viewBoxSize={[150, 150]}
        labelStyle={{
          fill: '#444',
          fontSize: '1rem',
          fontFamily: 'sans-serif',
        }}
      />
    </div>
  )
}
