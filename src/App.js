import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./component/Login";
import Dashboard from "./component/Dashboard"
import Register from "./component/Register";
import "react-toastify/dist/ReactToastify.css";


// Configuration object for the application's API endpoint
export const config = {
  endpoint: `http://localhost:3001/api`,
};

// Main application component
export default function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/summary" element={<Dashboard />} />
          {/* Route for the registration page */}
          <Route path="/register" element={<Register />} />
          {/* Default route for the login page */}
          <Route path="/*" element={<Login />} />
        </Routes>
      </BrowserRouter>
      {/* Toast notification container */}
      <ToastContainer
        className="toast-container"
        closeButton={false}
        closeOnClick
      />
    </div>
  );
}
