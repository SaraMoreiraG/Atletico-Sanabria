import React, { useState, useEffect } from "react";

import "./PointTable.css";

function PointTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the URL to fetch data
	const apiUrl = process.env.REACT_APP_API_URL + "/clasificationdb/full";

    // Make a GET request to the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        data.sort((a, b) => a.position - b.position);
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

  return (
<div className="col-lg-4 col-md-12 px-2 d-flex align-items-start">
  <div className="clasification col-12 p-3">
    <h3 className="mb-3">Clasificación</h3>
    <div className="table-container">
      <table className="clasification-table">
        <thead>
          <tr className="text-center">
            <th className="col-1 p-2">Pos</th>
            <th className="col-6 text-start">Equipo</th>
            <th className="col-1">PJ</th>
            <th className="col-1">PG</th>
            <th className="col-1">PE</th>
            <th className="col-1">PP</th>
            <th className="col-1">Pts</th>
          </tr>
        </thead>
      </table>
    </div>
    <div className="table-container">
      <table className="clasification-table">
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="col-1 py-2">{item.position}</td>
              <td className="col-6 text-start">
                <img
                  src={`https://images-atletico-sanabria.s3.amazonaws.com/logos/${item.shortName}.png`}
                  height="25px"
                  className="me-2"
                  alt={`logo ${item.name}`}
                />
                {item.name}
              </td>
              <td className="col-1">{item.pj}</td>
              <td className="col-1">{item.pg}</td>
              <td className="col-1">{item.pe}</td>
              <td className="col-1">{item.pp}</td>
              <td className="col-1">{item.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
}

export default PointTable;
