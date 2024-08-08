import { TextField, Button, Snackbar, Alert } from "@mui/material";
import "./loginAndRegister.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import {config} from "../App";

const LoginAndRegister = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle user login
  const loginUser = async () => {
    try {
      // Send a POST request to login the user
      const response = await axios.post(
        `${config.endpoint}/users/login`,
        {
          email,
          password,
        }
      );

      // Store the username and auth token in local storage
      localStorage.setItem("userName", response.data.userData.username);
      localStorage.setItem("authToken", response.data.token);
      // Show a success toast message
      toast.success("Successfully Logged In", 3000);
      // Navigate to the student page
      navigate("/summary");
    } catch (error) {
      // Show an error toast message
      toast.error(error.response.data.message, 3000);
    }
  };

  return (
    <section className="login-container">
      <div className="login-header">
        <div className="header">LOGIN</div>
        <p>Get Started With student Bot</p>
      </div>
      {/* Input field for email */}
      <TextField
        label="Email"
        variant="outlined"
        onChange={(event) => setEmail(event.target.value)}
      />
      {/* Input field for password */}
      <TextField
        label="Password"
        variant="outlined"
        onChange={(event) => setPassword(event.target.value)}
        type="password"
      />
      <div className="subtitle">
        I donot have Any Account ? <a href="/register">Register Now</a>
      </div>
      {/* Submit button to trigger login */}
      <Button
        variant="contained"
        onClick={async () => {
          await loginUser();
        }}
      >
        {" "}
        Submit
      </Button>
    </section>
  );
};

export default LoginAndRegister;

