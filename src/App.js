import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";

import "./App.css";

import Navbar from "./Navbar";
import Home from "./views/Home";
import Login from "./views/login";
import Dashboard from "./views/Dashboard";
import NewMemberForm from "./views/NewMemberForm";
import ActivitiesForm from "./views/ActivitiesForm";
import ColaboratorsForm from "./views/ColaboratorsForm";
import CardDetails from "./views/CardDetails";
import Calendary from "./views/Calendary";
import Footer from "./components/Footer/Footer";

function App() {
  const { login } = useAuth();

  useEffect(() => {
    // Check for authentication on page load
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      login();
    }
  }, [login]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/formulario-nuevo-socio" element={<NewMemberForm />} />
        <Route path="/formulario-actividades" element={<ActivitiesForm />} />
        <Route path="/formulario-colaboradores" element={<ColaboratorsForm />} />
        <Route path="/deportes/:sport" element={<CardDetails />} />
        <Route path="/calendario" element={<Calendary />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

function AppWithProvider() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithProvider;
