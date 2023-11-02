import React from 'react'
import SimpleSlider from "../Slider";
import NextMatch from "../components/NextMatch/NextMatch";
import PointTable from "../components/PointTable/PointTable";
import Sponsors from '../components/Sponsors/Sponsors';

function Home() {
  return (
	<div className='main'>
      <SimpleSlider />
      <div className="main-margin row d-flex justify-content-between">
        <NextMatch />
        <PointTable />
      </div>
      <Sponsors />
	</div>
  )
}

export default Home
