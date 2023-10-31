import React from 'react'
import SimpleSlider from "../Slider";
import NextMatch from "../components/NextMatch/NextMatch";
import PointTable from "../components/PointTable/PointTable";

function Home() {
  return (
	<div className='main'>
      <SimpleSlider />
      <div className="main-margin d-flex justify-content-between">
        <NextMatch />
        <PointTable />
      </div>
	</div>
  )
}

export default Home
