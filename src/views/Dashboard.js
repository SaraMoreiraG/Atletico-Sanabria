import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Clasification from "../management/Clasification";
import Matches from "../management/Matches";

function Dashboard() {
  const { isAuthenticated } = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to the login page if the user is not authenticated
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

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
