import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import "./App.css";

import Navbar from "./Navbar";
import Home from "./views/Home";
import Login from "./views/login";
import Dashboard from "./views/Dashboard";
import NewMemberForm from "./views/NewMemberForm";
import CardDetails from "./views/CardDetails";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/newmemberform" element={<NewMemberForm />} />
          <Route path="/deportes/:sport" element={<CardDetails />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
