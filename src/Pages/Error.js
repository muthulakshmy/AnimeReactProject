import React from "react";
import Typography from "@mui/material/Typography";
import { Box ,Button} from "@mui/material";
import { useNavigate } from "react-router-dom";
const Error = () => {
  const navigate=useNavigate()
  return (
    <Box>
      <Typography>404 ERROR</Typography>
      <Typography>Page Not Found</Typography>
      {/* <Button onClick={navigate("/home")}>Go Back</Button> */}
    </Box>
  );
};

export default Error;
