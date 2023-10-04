import React from "react";
import { useAuth } from "./auth.js";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button, Box, Typography } from "@mui/material";
const ProfileData = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();
    navigate("/");
  };

  return (
    <Box>
      <Typography>
        Welcome {auth.logName} ! <AccountCircleIcon></AccountCircleIcon>{" "}
      </Typography>

      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default ProfileData;
