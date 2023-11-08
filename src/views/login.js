import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    const serverURL = process.env.REACT_APP_API_URL + "/authentication";
    const data = {
      username: username,
      password: password,
    };

    // POST request
    fetch(`${serverURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        return response.json();
      })
      .then((data) => {
        // Handle successful login and JWT token
        const token = data.token;
        localStorage.setItem("token", token);

        // Use the login function from the AuthContext to set the user as authenticated
        login();

        // Navigate to the dashboard
        navigate("/dashboard");
      })
      .catch((error) => {
        setError(error.message); // Display the error message to the user
      });
  };

  return (
    <div className="login">
      <div className="management text-center border-rounded p-5">
        <h3 className="mb-4">Iniciar sesión</h3>
        <form>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div>
            <input
              type="text"
              className="mb-4"
              placeholder="Nombre de usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="button" className="btn-grey" onClick={handleLogin}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
