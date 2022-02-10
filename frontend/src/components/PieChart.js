import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'

import { useSelector } from 'react-redux'

export const PieChart1 = () => {
  const genderRatio = useSelector((store) => store.company.genderRatio)
  const genderRatioSearchedCompany = useSelector(
    (store) => store.searchedCompany.genderRatio,
  )
  const pieData = [
    { title: 'Women', value: genderRatio, color: '#ff6600' },
    { title: 'Men', value: 100 - genderRatio, color: '#c43300' },
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

export const PieChart2 = () => {
  const genderRatio = useSelector((store) => store.company.genderRatio)
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

export const PieChart3 = ({ genderRatio }) => {
  // const genderRatio = useSelector((store) => store.company.genderRatio)
  // const genderRatioSearchedCompany = useSelector(
  //   (store) => store.searchedCompany.genderRatio,
  //)
  const pieData = [
    { title: 'Women', value: genderRatio, color: '#ff6600' },
    { title: 'Men', value: 100 - genderRatio, color: '#c43300' },
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
        labelPosition={150}
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
