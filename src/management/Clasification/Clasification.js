import React, { useState, useEffect } from "react";

import "./Clasification.css";

import logo from "../../assets/images/atletico-sanabria-transparent.png";

function Clasification() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editState, setEditState] = useState({
    rowIndex: null,
    columnIndex: null,
  });

  useEffect(() => {
    // Define the URL to fetch data
    const apiUrl = "http://localhost:3001/clasificationdb/full";

    // Make a GET request to the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
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

  const handleEditClick = (rowIndex, itemId) => {
    // Set the edit state for the clicked row
    setEditState({ rowIndex, columnIndex: null });
  };

  const handleInputChange = (rowIndex, columnName, value) => {
    // Update the data in a controlled manner when inputs change
    const updatedData = [...data];
    updatedData[rowIndex][columnName] = value;
    setData(updatedData);
  };

  const handleSaveClick = (item) => {
    setEditState({ rowIndex: null, columnIndex: null });
console.log(item)
    // Make an API call to update the item in the backend
    const apiUrl = `http://localhost:3001/clasificationdb/update/${item.id}`;
    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Handle the success response here
        // You may also update the state or refresh the data from the server if needed.
      })
      .catch((err) => {
        // Handle the error
        console.error(err);
      });
  };

  const isRowInEditState = (rowIndex) => {
    return editState.rowIndex === rowIndex;
  };

  let position = 1;

  return (
    <div className="clasification col-4 p-3 my-5">
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
          {data.map((item, rowIndex) => (
            <tr
              className={`text-center ${
                isRowInEditState(rowIndex) ? "edit-mode" : ""
              }`}
              key={rowIndex}
            >
              <td className="py-2">{position++}.</td>
              <td className="text-start">
                <img
                  src={logo}
                  height="25px"
                  className="me-2"
                  alt={item.name}
                />
                {isRowInEditState(rowIndex) ? (
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleInputChange(rowIndex, "name", e.target.value)
                    }
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {isRowInEditState(rowIndex) ? (
                  <input
                    type="text"
					value={item.pj.toString()}
					onChange={(e) => handleInputChange(rowIndex, 'pj', parseInt(e.target.value, 10))}
                  />
                ) : (
                  item.pj
                )}
              </td>
              <td>
                {isRowInEditState(rowIndex) ? (
                  <input
                    type="text"
                    value={item.pg}
                    onChange={(e) =>
                      handleInputChange(rowIndex, "pg", e.target.value)
                    }
                  />
                ) : (
                  item.pg
                )}
              </td>
              <td>
                {isRowInEditState(rowIndex) ? (
                  <input
                    type="text"
                    value={item.pe}
                    onChange={(e) =>
                      handleInputChange(rowIndex, "pe", e.target.value)
                    }
                  />
                ) : (
                  item.pe
                )}
              </td>
              <td>
                {isRowInEditState(rowIndex) ? (
                  <input
                    type="text"
                    value={item.pp}
                    onChange={(e) =>
                      handleInputChange(rowIndex, "pp", e.target.value)
                    }
                  />
                ) : (
                  item.pp
                )}
              </td>
              <td>
                {isRowInEditState(rowIndex) ? (
                  <input
                    type="text"
                    value={item.pts}
                    onChange={(e) =>
                      handleInputChange(rowIndex, "pts", e.target.value)
                    }
                  />
                ) : (
                  item.pts
                )}
              </td>
              <td>
                {isRowInEditState(rowIndex) ? (
                  <button
                    onClick={() => handleSaveClick(item)}
                  >
                    Save
                  </button>
                ) : (
                  <button onClick={() => handleEditClick(rowIndex, item.id)}>
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clasification;

          {/* {data.map((item, index ) => (
		<tr key={index} className="text-center">
            <td className="py-2">{position++}.</td>
            <td className="text-start">
				<img src={logo} height="25px" className="me-2"/>
				{item.name}
			</td>
            <td>{item.pj}</td>
            <td>{item.pg}</td>
            <td>{item.pe}</td>
            <td>{item.pp}</td>
            <td>{item.pts}</td>
          </tr>
        ))} */}
