import React from "react";
import { Box, Button, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../auth";
import MuiAlert from "@mui/material/Alert";
import PasswordInput from "./PasswordInput";
import UsernameInput from "./UsernameInput";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const alertMsg = {
  error: {
    msg: "Register First !",
    severity: "error",
    key: "error",
  },
  empty: {
    msg: "Please fill the details",
    severity: "error",
    key: "empty",
  },
  success: {
    msg: "Logged in successfully!",
    severity: "success",
    key: "success",
  },
};

const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState({ pwd: false });
  const [empty, setEmpty] = useState(false);
  const auth = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const Navigate = useNavigate();

  const [errorType, setErrorType] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    auth.login(name);
    if (name === "") {
      setEmpty(true);
      setErrorType(alertMsg.empty.key);
    }
    if (password === "") {
      setEmpty(true);
      setErrorType(alertMsg.empty.key);
    }

    const data = JSON.parse(localStorage.getItem("userData") || "[]");
    if (data.length > 0) {
      const loginDetails = data.filter((detail) => {
        return detail.name === name && detail.password === password;
      });
      if (loginDetails.length > 0) {
        setLoggedIn(true);
        setTimeout(() => {
          Navigate("/home");
        }, 1500);
        setErrorType(alertMsg.success.key);
      } else {
        setError(true);
        setErrorType(alertMsg.error.key);
      }
    }
    setName("");
    setPassword("");
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setLoggedIn(false);
    setError(false);
    setErrorType("");
  };

  return (
    <Box>
      <Box
        sx={{
          width: 300,
          height: 368,
          mx: 40,
          my: 1,
          padding: 10,
          backgroundColor: "aliceblue",
        }}
      >
        <Typography
          variant="h6"
          componnet="h6"
          sx={{ fontFamily: "monospace", color: "teal", mb: 2 }}
        >
          Login Page
        </Typography>

        <UsernameInput
          sx={{ mb: 2 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={(e, error) => {
            setErrors((state) => ({ ...state, pwd: error }));
          }}
        />

        <PasswordInput
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          onBlur={(e, error) => {
            setErrors((state) => ({ ...state, pwd: error }));
          }}
        />
        <MyAlert
          open={errorType}
          onClose={handleClose}
          msg={alertMsg[errorType]?.msg}
          severity={alertMsg[errorType]?.severity}
        />

        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
        <Box
          sx={{
            mt: 2,
            fontFamily: "monospace",
            color: "teal",
            fontSize: "15px",
          }}
        >
          New User ? <Link to="/register">Register</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

function MyAlert({ msg, onClose, open, severity }) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {msg}
      </Alert>
    </Snackbar>
  );
}
