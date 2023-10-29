import React, { useState, useEffect } from "react";

import "./management.css";

import logo from "../assets/images/atletico-sanabria-transparent.png";

function Clasification() {
  // State variables
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
  let position = 1;

  // Function to fetch data from the server
  const getDataFromServer = () => {
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
  };

  // Effect to fetch data when the component mounts
  useEffect(() => {
    getDataFromServer();
  }, []);

  // Function to handle input changes for a new team
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTeam((prevTeam) => ({
      ...prevTeam,
      [name]: value,
    }));
  };

  // Function to add a new team
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
            setNewTeam({
              id: "", // Clear the ID field
              name: "",
              pj: "",
              pg: "",
              pe: "",
              pp: "",
              pts: "",
            });
            getDataFromServer();
            setAddingTeam(false);
          } else {
            // Handle any other response status codes or errors here
            alert("Error al añadir el nuevo equipo");
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

  // Function to handle an edit click on a specific row
  const handleEdit = (rowIndex) => {
    setEditState({ rowIndex, columnIndex: null });
	setAddingTeam(false)
  setNewTeam({
    name: "",
    pj: "",
    pg: "",
    pe: "",
    pp: "",
    pts: "",
  });
  };

  // Function to check if a row is in edit state based on its rowIndex
  const isRowInEditState = (rowIndex) => {
    return editState.rowIndex === rowIndex;
  };

  // Function to cancel row edit
  const handleCancel = () => {
    setEditState(false);
    setNewTeam({
      name: "",
      pj: "",
      pg: "",
      pe: "",
      pp: "",
      pts: "",
    });
  };

  // Function to update team
  const handleSave = (item) => {
    setEditState({ rowIndex: null, columnIndex: null });

    const updatedFields = {
      pe: newTeam.pe !== "" ? parseInt(newTeam.pe, 10) : item.pe,
      pg: newTeam.pg !== "" ? parseInt(newTeam.pg, 10) : item.pg,
      pj: newTeam.pj !== "" ? parseInt(newTeam.pj, 10) : item.pj,
      pp: newTeam.pp !== "" ? parseInt(newTeam.pp, 10) : item.pp,
      pts: newTeam.pts !== "" ? parseInt(newTeam.pts, 10) : item.pts,
      name: newTeam.name === "" ? item.name : newTeam.name,
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
        getDataFromServer();
        setNewTeam({
          name: "",
          pj: "",
          pg: "",
          pe: "",
          pp: "",
          pts: "",
        });
      })
      .catch((err) => {
        // Handle the error
        console.error(err);
      });
  };

  // Function to delete a team
  const handleDelete = (itemId, itemName) => {
    fetch(
      `http://localhost:3001/clasificationdb/delete/${itemId}/${itemName}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status === 204) {
          // Item deleted successfully
          getDataFromServer();
        } else {
          // Failed to delete the item
          alert("Failed to delete the item. Please try again.");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

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
    <div className="management col-12 p-3 my-5">
      <div className="d-flex">
        <div className="col-6">
          <h3 className="mb-3">Clasificación</h3>
        </div>
        <div className="col-6 text-end">
          <button onClick={() => setAddingTeam(true)} className="btn-red">
            Añadir equipo
          </button>
        </div>
      </div>
      <table className="management-table">
        <thead>
          <tr className="text-center">
            <th className="col-1 p-2">Pos</th>
            <th className="text-start col-3">Equipo</th>
            <th className="col-1">PJ</th>
            <th className="col-1">PG</th>
            <th className="col-1">PE</th>
            <th className="col-1">PP</th>
            <th className="col-1">Pts</th>
            <th className="col-3"></th>
          </tr>
        </thead>
        <tbody>
          {addingTeam && (
            <tr className="text-center">
              <td></td>
              <td>
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre del equipo"
                  value={newTeam.name}
                  onChange={handleInputChange}
                  className="col-11"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="pj"
                  placeholder="PJ"
                  value={newTeam.pj}
                  onChange={handleInputChange}
                  className="col-12"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="pg"
                  placeholder="PG"
                  value={newTeam.pg}
                  onChange={handleInputChange}
                  className="col-12"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="pe"
                  placeholder="PE"
                  value={newTeam.pe}
                  onChange={handleInputChange}
                  className="col-12"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="pp"
                  placeholder="PP"
                  value={newTeam.pp}
                  onChange={handleInputChange}
                  className="col-12"
                />
              </td>
              <td>
                <input
                  type="number"
                  name="pts"
                  placeholder="Pts"
                  value={newTeam.pts}
                  onChange={handleInputChange}
                  className="col-12"
                />
              </td>
              <td className="text-end">
                <button onClick={handleAddTeam} className="btn-red my-2">
                  <i className="fa-solid fa-check"></i> Añadir
                </button>
              </td>
            </tr>
          )}
          {data.map((item, rowIndex) => (
            <tr
              className={`text-center ${
                isRowInEditState(rowIndex) ? "edit-mode" : ""
              }`}
              key={rowIndex}
            >
              <td className="py-2">{position++}.</td>
              <td className="d-flex align-items-center text-start py-2">
                <div>
                  <img
                    src={logo}
                    height="25px"
                    className="me-2"
                    alt={item.name}
                  />
                </div>
                <div>{item.name}</div>
              </td>
              <td>
                {isRowInEditState(rowIndex) ? (
                  <input
                    type="number"
                    value={newTeam.pj}
                    name="pj"
                    placeholder={item.pj}
                    className="col-12"
                    onChange={handleInputChange}
                  />
                ) : (
                  item.pj
                )}
              </td>
              <td>
                {isRowInEditState(rowIndex) ? (
                  <input
                  type="number"
                  value={newTeam.pg}
                  name="pg"
                  placeholder={item.pg}
                  className="col-12"
                  onChange={handleInputChange}
                />
                ) : (
                  item.pg
                )}
              </td>
              <td>
                {isRowInEditState(rowIndex) ? (
                  <input
                  type="number"
                  value={newTeam.pe}
                  name="pe"
                  placeholder={item.pe}
                  className="col-12"
                  onChange={handleInputChange}
                />
                ) : (
                  item.pe
                )}
              </td>
              <td>
                {isRowInEditState(rowIndex) ? (
                  <input
                  type="number"
                  value={newTeam.pp}
                  name="pp"
                  placeholder={item.pp}
                  className="col-12"
                  onChange={handleInputChange}
                />
                ) : (
                  item.pp
                )}
              </td>
              <td>
                {isRowInEditState(rowIndex) ? (
                  <input
                  type="number"
                  value={newTeam.pts}
                  name="pts"
                  placeholder={item.pts}
                  className="col-12"
                  onChange={handleInputChange}
                />
                ) : (
                  item.pts
                )}
              </td>
              {/* Edit buttons */}
              <td className="">
                <div className="d-flex justify-content-evenly">
                  {isRowInEditState(rowIndex) ? (
                    <>
                      <button
                        onClick={() => handleSave(item)}
                        className="btn-grey"
                      >
                        <i className="fa-regular fa-floppy-disk ms-1"></i>
                      </button>
                      <button
                        onClick={() => handleCancel()}
                        className="btn-grey"
                      >
                        <i className="fa-solid fa-x"></i>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(rowIndex, item.id)}
                        className="btn-grey"
                      >
                        <i className="fa-regular fa-pen-to-square ms-1"></i>
                      </button>
                      <button
                        onClick={() => handleDelete(item.id, item.name)}
                        className="btn-grey"
                      >
                        <i className="fa-regular fa-trash-can ms-1"></i>
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Clasification;
