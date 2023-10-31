import React, { useEffect } from 'react'
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Clasification from '../management/Clasification'
import Matches from '../management/Matches'


function Dashboard() {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
	  if (!isAuthenticated) {
		// Redirect to the login page if the user is not authenticated
		navigate("/login");
	  }
	}, [isAuthenticated, navigate]);

  return (
	<div className='dashboard'>
	        <div className="main-margin d-flex justify-content-between">
        <Clasification />
      </div>
      <div className="main-margin d-flex justify-content-between">
        <Matches />
      </div>
	</div>
  )
}

export default Dashboard
