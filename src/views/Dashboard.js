import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Clasification from "../management/Clasification";
import Matches from "../management/Matches";

function Dashboard() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // When the component mounts, check if the user is authenticated
    if (isAuthenticated) {
      // If authenticated, set loading to false
      setLoading(false);
    } else {
      // If not authenticated, you can either log out or handle the situation as needed
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    // While loading, you can display a loading indicator or message
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="main-margin justify-content-between">
		<div onClick={() => logout()} className="log-out">
		<span>LOG OUT</span>
		<i className="fa-regular fa-user ms-2"></i>
		</div>
        <Clasification />
        <Matches />
      </div>
    </div>
  );
}

export default Dashboard;
