import logo from './assets/images/atletico-sanabria-transparent.png';
import './App.css';

import Navbar from './Navbar';
import SimpleSlider from './Slider';
import NextMatch from './components/NextMatch/NextMatch';
import PointTable from './components/PointTable/PointTable';
import Clasification from './management/Clasification/Clasification';

function App() {
  return (
    <div className="App">
      <Navbar />
      <SimpleSlider />
      <div className='main-margin d-flex justify-content-between'>
      <NextMatch />
      <PointTable />
      </div>
      <Clasification />

    </div>
  );
}

export default App;
