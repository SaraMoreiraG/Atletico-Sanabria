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
  const [addingTeam, setAddingTeam] = useState(false);
  const [newTeam, setNewTeam] = useState({
    name: "",
    pj: "",
    pg: "",
    pe: "",
    pp: "",
    pts: "",
  });

  const handleInputChangeNewTeam = (event) => {
    const { name, value } = event.target;
    setNewTeam((prevTeam) => ({
      ...prevTeam,
      [name]: value,
    }));
  };

  const handleAddTeam = () => {
    // Generate a random ID using a timestamp and a random number
    const randomId = Date.now() + Math.floor(Math.random() * 1000);

    // Check if all required properties are defined
    if (
      newTeam &&
      newTeam.name !== undefined &&
      newTeam.pj !== undefined &&
      newTeam.pg !== undefined &&
      newTeam.pe !== undefined &&
      newTeam.pp !== undefined &&
      newTeam.pts !== undefined
    ) {
      // Prepare the data to send to the server, including the generated ID
      const newTeamData = {
        name: newTeam.name,
        pj: parseInt(newTeam.pj),
        pg: parseInt(newTeam.pg),
        pe: parseInt(newTeam.pe),
        pp: parseInt(newTeam.pp),
        pts: parseInt(newTeam.pts),
      };
      console.log(newTeamData)
      // Send a POST request to your server using fetch or Axios
      fetch("http://localhost:3001/clasificationdb/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTeamData), // Convert data to JSON
      })
        .then((response) => {
          if (response.status === 201) {
            // Team added successfully
            alert("Team added successfully.");
            // Clear the form or update the UI as needed
            setNewTeam({
              id: "", // Clear the ID field
              name: "",
              pj: "",
              pg: "",
              pe: "",
              pp: "",
              pts: "",
            });
          } else {
            // Handle any other response status codes or errors here
            alert("Failed to add the team. Please try again.");
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
          // Handle the error as needed
        });
    } else {
      // Handle the case where some properties are undefined
      alert("Please fill in all the required fields.");
    }
  };



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
        console.log(data)
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

  const handleEditClick = (rowIndex) => {
    setEditState({ rowIndex, columnIndex: null });
  };

  const handleInputChange = (rowIndex, columnName, value) => {
    const updatedData = [...data];
    updatedData[rowIndex][columnName] = value;
    setData(updatedData);
  };

  const handleSaveClick = (item) => {
    setEditState({ rowIndex: null, columnIndex: null });

    const updatedFields = {
      pe: item.pe,
      pg: item.pg,
      pj: item.pj,
      pp: item.pp,
      pts: item.pts,
      name: item.name,
    };

    const apiUrl = `http://localhost:3001/clasificationdb/update/${item.id}`;
    fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFields), // Send only the fields you want to update
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

  const handleDeleteClick = (itemId, itemName) => {
    fetch(`http://localhost:3001/clasificationdb/delete/${itemId}/${itemName}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 204) {
          // Item deleted successfully
          alert("Item deleted successfully.");
        } else {
          // Failed to delete the item
          alert("Failed to delete the item. Please try again.");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  let position = 1;

  return (
    <div className="clasification col-4 p-3 my-5">
      <h3 className="mb-3">Clasificación</h3>
      <button onClick={() => setAddingTeam(true)}>Añadir equipo</button>
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
                {item.name}
              </td>
              <td>
                {isRowInEditState(rowIndex) ? (
                  <input
                    type="text"
                    value={item.pj}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "") {
                        handleInputChange(rowIndex, "pj", 0);
                      } else if (/^\d*$/.test(value)) {
                        handleInputChange(rowIndex, "pj", parseInt(value, 10));
                      } else {
                      }
                    }}
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
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "") {
                        handleInputChange(rowIndex, "pg", 0);
                      } else if (/^\d*$/.test(value)) {
                        handleInputChange(rowIndex, "pg", parseInt(value, 10));
                      } else {
                      }
                    }}
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
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "") {
                        handleInputChange(rowIndex, "pe", 0);
                      } else if (/^\d*$/.test(value)) {
                        handleInputChange(rowIndex, "pe", parseInt(value, 10));
                      } else {
                      }
                    }}
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
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "") {
                        handleInputChange(rowIndex, "pp", 0);
                      } else if (/^\d*$/.test(value)) {
                        handleInputChange(rowIndex, "pp", parseInt(value, 10));
                      } else {
                      }
                    }}
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
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "") {
                        handleInputChange(rowIndex, "pts", 0);
                      } else if (/^\d*$/.test(value)) {
                        handleInputChange(rowIndex, "pts", parseInt(value, 10));
                      } else {
                      }
                    }}
                  />
                ) : (
                  item.pts
                )}
              </td>
              <td>
                {isRowInEditState(rowIndex) ? (
                  <button onClick={() => handleSaveClick(item)}>Save</button>
                ) : (
                  <button onClick={() => handleEditClick(rowIndex, item.id)}>
                    Edit
                  </button>
                )}
              </td>
              <td>
                <button onClick={() => handleDeleteClick(item.id, item.name)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {addingTeam && (
    <tr>
    <td></td>
    <td>
      <input
        type="text"
        name="name"
        placeholder="Nombre del equipo"
        value={newTeam.name}
        onChange={handleInputChangeNewTeam}
      />
    </td>
    <td>
      <input
        type="number"
        name="pj"
        placeholder="PJ"
        value={newTeam.pj}
        onChange={handleInputChangeNewTeam}
      />
    </td>
    <td>
      <input
        type="number"
        name="pg"
        placeholder="PG"
        value={newTeam.pg}
        onChange={handleInputChangeNewTeam}
      />
    </td>
    <td>
      <input
        type="number"
        name="pe"
        placeholder="PE"
        value={newTeam.pe}
        onChange={handleInputChangeNewTeam}
      />
    </td>
    <td>
      <input
        type="number"
        name="pp"
        placeholder="PP"
        value={newTeam.pp}
        onChange={handleInputChangeNewTeam}
      />
    </td>
    <td>
      <input
        type="number"
        name="pts"
        placeholder="Pts"
        value={newTeam.pts}
        onChange={handleInputChangeNewTeam}
      />
    </td>
    <td>
      <button onClick={handleAddTeam}>Añadir</button>
    </td>
  </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Clasification;

{
  /* {data.map((item, index ) => (
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
        ))} */
}
