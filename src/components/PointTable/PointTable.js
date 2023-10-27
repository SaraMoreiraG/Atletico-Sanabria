import React from "react";

import './PointTable.css'

import logo from "../../assets/images/atletico-sanabria-transparent.png";

function PointTable() {
  return (
    <div className="clasification col-4 p-3 my-5">
      <h3 className="mb-3">Clasificación</h3>
      <table className="clasification-table">
        <thead>
          <tr className="text-center">
            <th className="col-1 p-2">Pos</th>
            <th className="text-start">Equipo</th>
            <th className="col-1">Pl</th>
            <th className="col-1">Pts</th>
            <th className="col-1">W</th>
            <th className="col-1">D</th>
            <th className="col-1">L</th>
          </tr>
        </thead>
        <tbody>
		<tr className="text-center">
            <td className="py-2">1.</td>
            <td className="text-start">
				<img src={logo} height="25px" className="me-2"/>
				Team A
			</td>
            <td>10</td>
            <td>30</td>
            <td>9</td>
            <td>3</td>
            <td>1</td>
          </tr>
          <tr className="text-center">
            <td className="py-2">2.</td>
            <td className="text-start">Team B</td>
            <td>10</td>
            <td>27</td>
            <td>8</td>
            <td>3</td>
            <td>2</td>
          </tr>
          <tr className="text-center">
            <td className="py-2">3.</td>
            <td className="text-start">Team C</td>
            <td>10</td>
            <td>24</td>
            <td>7</td>
            <td>3</td>
            <td>3</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PointTable;
