import React, { useState, useEffect } from "react";

import "./management.css";

import logo from "../assets/images/atletico-sanabria-transparent.png";

function Matches() {
  // State variables
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editState, setEditState] = useState({
    rowIndex: null,
    columnIndex: null,
  });
  const [addingMatch, setAddingMatch] = useState(false);
  const [newMatch, setNewMatch] = useState({
    date: "",
    hour: "",
    place: "",
    homeTeam: "",
    visitorTeam: "",
  });

  // Function to fetch data from the server
  const getDataFromServer = () => {
    // Define the URL to fetch data
    const apiUrl = "https://mrew2ksxap.us-east-1.awsapprunner.com/matchesdb/full";

    // Make a GET request to the API
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
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

  // Function to handle input changes for a new match
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMatch((prevMatch) => ({
      ...prevMatch,
      [name]: value,
    }));
  };

  // Function to add a new match
  const handleAddMatch = () => {
    // Check if all required properties are defined
    if (
      newMatch &&
      newMatch.date !== undefined &&
      newMatch.hour !== undefined &&
      newMatch.place !== undefined &&
      newMatch.homeTeam !== undefined &&
      newMatch.visitorTeam !== undefined
    ) {
      // Prepare the data to send to the server, including the generated ID
      const newMatchData = {
        date: newMatch.date,
        hour: newMatch.hour,
        place: newMatch.place,
        homeTeam: newMatch.homeTeam,
        visitorTeam: newMatch.visitorTeam,
      };

      // Send a POST request to your server using fetch or Axios
      fetch("https://mrew2ksxap.us-east-1.awsapprunner.com/matchesdb/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMatchData), // Convert data to JSON
      })
        .then((response) => {
          if (response.status === 201) {
            // Team added successfully
            setNewMatch({
              date: "",
              hour: "",
              place: "",
              homeTeam: "",
              visitorTeam: "",
            });
            getDataFromServer();
            setAddingMatch(false);
          } else {
            // Handle any other response status codes or errors here
            alert("Error al añadir el nuevo partido");
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

    // Function to delete match
	const handleDelete = (itemId) => {
		fetch(`https://mrew2ksxap.us-east-1.awsapprunner.com/matchesdb/delete/${itemId}`, {
		  method: "DELETE",
		  headers: {
			"Content-Type": "application/json",
		  },
		})
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

  // Function to handle row edit
  const handleEdit = (rowIndex) => {
    setEditState({ rowIndex, columnIndex: null });
	setAddingMatch(false)
	setNewMatch({
		date: "",
		hour: "",
		place: "",
		homeTeam: "",
		visitorTeam: "",
	  });
  };

  // Function to check if a row is in edit state based on its rowIndex
  const isRowInEditState = (rowIndex) => {
    return editState.rowIndex === rowIndex;
  };

  // Function to cancel row edit
  const handleCancel = () => {
	setEditState(false);
	setNewMatch({
		date: "",
		hour: "",
		place: "",
		homeTeam: "",
		visitorTeam: "",
	  });
  };

  // Function to update team
  const handleSave = (item) => {
    setEditState({ rowIndex: null, columnIndex: null });

    const updatedFields = {
      date: newMatch.date !== "" ? newMatch.date : item.date,
      hour: newMatch.hour !== "" ? newMatch.hour : item.hour,
      place: newMatch.place !== "" ? newMatch.place : item.place,
      homeTeam: newMatch.homeTeam !== "" ? newMatch.homeTeam : item.homeTeam,
      visitorTeam: newMatch.visitorTeam !== "" ? newMatch.visitorTeam : item.visitorTeam,
    };

    const apiUrl = `https://mrew2ksxap.us-east-1.awsapprunner.com/matchesdb/update/${item.id}`;
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
		setNewMatch({
			date: "",
			hour: "",
			place: "",
			homeTeam: "",
			visitorTeam: "",
		  });
      })
      .catch((err) => {
        // Handle the error
        console.error(err);
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
          <h3 className="mb-3">Próximos partidos</h3>
        </div>
        <div className="col-6 text-end">
          <button onClick={() => setAddingMatch(true)} className="btn-red">
            Añadir partido
          </button>
        </div>
      </div>
      <table className="management-table">
        <thead>
          <tr className="text-center">
            <th className="text-end p-2">Local</th>
            <th className="text-start p-2">Visitante</th>
            <th className="col-1 p-2">Fecha</th>
            <th className="col-1 p-2">Hora</th>
            <th className="col-3 p-2">Lugar</th>
            <th className="col-2 p-2"></th>
          </tr>
        </thead>
        <tbody>
          {addingMatch && (
            <tr className="text-center">
              <td>
                <input
                  type="text"
                  name="homeTeam"
                  placeholder="Selecciona"
                  value={newMatch.homeTeam}
                  onChange={handleInputChange}
                  className="col-12"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="visitorTeam"
                  placeholder="Selecciona"
                  value={newMatch.visitorTeam}
                  onChange={handleInputChange}
                  className="col-12"
                />
              </td>
              <td>
                <input
                  type="date"
                  name="date"
                  placeholder="Fecha"
                  value={newMatch.date}
                  onChange={handleInputChange}
                  className="col-11"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="hour"
                  placeholder="hora"
                  value={newMatch.hour}
                  onChange={handleInputChange}
                  className="col-12"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="place"
                  placeholder="Lugar"
                  value={newMatch.place}
                  onChange={handleInputChange}
                  className="col-12"
                />
              </td>
              <td className="text-end">
                <button onClick={handleAddMatch} className="btn-red my-2">
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
              <td>
                {isRowInEditState(rowIndex) ? (
                  <input
                    type="text"
					value={newMatch.homeTeam}
                    name="homeTeam"
					placeholder={item.homeTeam}
                    className="col-12 text-end"
                    onChange={
						handleInputChange
					  }
                  />
                ) : (
                  <div className="d-flex align-items-center justify-content-end py-2">
                    <div>{item.homeTeam}</div>
                    <div>
                      <img
                        src={logo}
                        height="25px"
                        className="ms-2"
                        alt={item.name}
                      />
                    </div>
                  </div>
                )}
              </td>
              <td>
                {isRowInEditState(rowIndex) ? (
                  <input
                    type="text"
					value={newMatch.visitorTeam}
                    name="visitorTeam"
					placeholder={item.visitorTeam}
					className="col-12"
                    onChange={
                      handleInputChange
                    }
                  />
                ) : (
                  <div className="d-flex align-items-center text-center py-2">
                    <div>
                      <img
                        src={logo}
                        height="25px"
                        className="me-2"
                        alt={item.name}
                      />
                    </div>
                    <div>{item.visitorTeam}</div>
                  </div>
                )}
              </td>
              <td>
                {isRowInEditState(rowIndex) ? (
                  <input
                    type="date"
					value={newMatch.date}
                    name="date"
					placeholder={item.date}
                    className="col-12 text-center"
                    onChange={
						handleInputChange
					  }
                  />
                ) : (
                  item.date
                )}
              </td>
              <td>
                {isRowInEditState(rowIndex) ? (
                  <input
                    type="text"
					value={newMatch.hour}
                    name="hour"
					placeholder={item.hour}
                    className="col-12 text-center"
                    onChange={
						handleInputChange
					  }
                  />
                ) : (
                  item.hour
                )}
              </td>
              <td>
                {isRowInEditState(rowIndex) ? (
                  <input
                    type="text"
					value={newMatch.place}
                    name="place"
					placeholder={item.place}
                    className="col-12 text-center"
                    onChange={
						handleInputChange
					  }
                  />
                ) : (
                  item.place
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

export default Matches;
