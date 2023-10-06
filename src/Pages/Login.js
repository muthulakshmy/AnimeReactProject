import React from "react";
import {
  TextField,
  Box,
  Button,
  Snackbar,
  Typography,
 
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../auth";
import MuiAlert from "@mui/material/Alert";
import PasswordInput from "./PasswordInput";
import UsernameInput from "./UsernameInput";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Login = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState({ pwd: false });
  const [empty, setEmpty] = useState(false);
  const auth = useAuth();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const Navigate = useNavigate();
  function handleLogin(e) {
    e.preventDefault();

    auth.login(name);
    if (name === "") {
      setEmpty(true);
    }
    if (password === "") {
      setEmpty(true);
    }

    const data = JSON.parse(localStorage.getItem("userData") || "[]");
    if (data.length > 0) {
      const loginDetails = data.filter((detail) => {
        // console.log(detail.name, detail.password, "blag,blag");
        return detail.name === name && detail.password === password;
      });
      if (loginDetails.length > 0) {
        setLoggedIn(true);
        setTimeout(() => {
          Navigate("/home");
        }, 1500);
      } else {
        setError(true);
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
  };

  return (
    <Box>
      <Box
        sx={{
          width: 300,
          height: 300,
          mx: 55,
          my: 5,
          padding: 10,
          backgroundColor: "aliceblue",
          "&:hover": {
            backgroundColor: "lightblue",

            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <Typography variant="h4" componnet="h4">
          Login Page
        </Typography>

        <UsernameInput
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

        <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Register First !
          </Alert>
        </Snackbar>
        <Snackbar open={empty} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            Register First !
          </Alert>
        </Snackbar>
        <Snackbar open={loggedIn} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Logged in successfully
          </Alert>
        </Snackbar>

        <Button variant="contained" onClick={handleLogin} disabled={errors.pwd}>
          Login
        </Button>
        <Box>
          New User ? <Link to="/register">Register</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
