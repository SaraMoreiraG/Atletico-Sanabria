import logo from "./assets/images/atletico-sanabria-transparent.png";
import "./App.css";

import Navbar from "./Navbar";
import SimpleSlider from "./Slider";
import NextMatch from "./components/NextMatch/NextMatch";
import PointTable from "./components/PointTable/PointTable";
import Clasification from "./management/Clasification";
import Matches from "./management/Matches";

function App() {
  return (
    <div className="App">
      <Navbar />
      <SimpleSlider />
      <div className="main-margin d-flex justify-content-between">
        <NextMatch />
        <PointTable />
      </div>
      <div className="main-margin d-flex justify-content-between">
        <Clasification />
      </div>
      <div className="main-margin d-flex justify-content-between">
        <Matches />
      </div>
    </div>
  );
}

export default App;
