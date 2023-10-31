import React, {useState, useEffect} from "react";

import './PointTable.css'

import logo from "../../assets/images/atletico-sanabria-transparent.png";

function PointTable() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
	  // Define the URL to fetch data
	  const apiUrl = 'https://mrew2ksxap.us-east-1.awsapprunner.com/clasificationdb/onlyfive';

	  // Make a GET request to the API
	  fetch(apiUrl)
		.then((response) => {
		  if (!response.ok) {
			throw new Error('Network response was not ok');
		  }
		  return response.json();
		})
		.then((data) => {
			data.sort((a, b) => b.pts - a.pts);
		  setData(data);
		  setLoading(false);
		})
		.catch((err) => {
		  setError(err);
		  setLoading(false);
		});
	}, []);

	if (loading) {
		return (
		  <div className="clasification col-4 p-3 my-5">
			<div>Loading...</div>
		  </div>
		);
	  }

	if (error) {
	  return <div>Error: {error.message}</div>;
	}
	let position = 1;
  return (
    <div className="col-4 px-2 d-flex align-items-start">
    <div className="clasification p-3">
      <h3 className="mb-3">Clasificación</h3>
      <table className="clasification-table">
        <thead>
          <tr className="text-center">
            <th className="col-1 p-2">Pos</th>
            <th className="text-start">Equipo</th>
            <th className="col-1">PJ</th>
            <th className="col-1">PG</th>
            <th className="col-1">PE</th>
            <th className="col-1">PP</th>
            <th className="col-1">Pts</th>
          </tr>
        </thead>
        <tbody>
		{data.map((item, index ) => (
		<tr key={index} className="text-center">
            <td className="py-2">{position++}.</td>
            <td className="text-start">
				<img src={logo} height="25px" className="me-2" alt={item.name} />
				{item.name}
			</td>
            <td>{item.pj}</td>
            <td>{item.pg}</td>
            <td>{item.pe}</td>
            <td>{item.pp}</td>
            <td>{item.pts}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
	</div>
  );
}

export default PointTable;
