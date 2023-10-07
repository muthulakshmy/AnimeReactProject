import React, { useState } from "react";
import {  Box, Button,IconButton,FormControl,InputAdornment,InputLabel,OutlinedInput,Snackbar, Typography } from "@mui/material";
import { Link ,useNavigate} from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import { useAuth } from "../auth";
import PasswordInput from "./PasswordInput";
import UsernameInput from "./UsernameInput";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

let passwordValidate = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$~`$%^&*()_+=-])[A-Za-z\d!@#$%^&*()]{8,}$/
const Register = () => {
  const [open, setOpen] = useState(false);
  const[errors,setErrors]=useState({pwd:false})
  const Navigate = useNavigate();
const[username,setUserName] = useState('')
const[password,setPassword] = useState('')
  const register=useAuth()
 
function handleUsername(e){
  setUserName(e.target.value)
}
function handlePassword(e){
  setPassword(e.target.value)



}
  function handleRegister(e) {
    e.preventDefault();
    
      const data = JSON.parse(localStorage.getItem("userData") ||"[]" );
      const userData = {
      
        name: username,
        password:password,
        
      };
      data.push(userData);
      setOpen(true);
      setTimeout(() => {
        Navigate("/");
      }, 1500);

      localStorage.setItem("userData", JSON.stringify(data));
      
 
  }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    register.setOpen(false);
  };
  return (
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
      <Typography variant="h6" componnet="h6" sx={{fontFamily:"monospace",color:"teal",mb:2}}>
          Register Page
        </Typography>
     

     <UsernameInput 
     sx={{mb:2}}
      onChange={handleUsername}
      value={username}
      // setUserName={setUserName}
        onBlur={(e,error)=>{setErrors((state)=>({...state,pwd:error}))}}

        
        />
<PasswordInput 

       value={password}
       onChange={handlePassword}
      // setPassword={setPassword}
      // onChange={(e) => {setPassword(e.target.value)}}

              onBlur={(e,error)=>{setErrors((state)=>({...state,pwd:error}))}}
            />
       
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Registered successfully now login
        </Alert>
      </Snackbar>
      <Button variant="contained" onClick={handleRegister} disabled={errors.pwd}>
        Register
      </Button>
      <Typography 
        sx={{mt:2,fontFamily:"monospace" ,color:"teal",fontSize:"15px"}} 
      
      >
        Already a user ? <Link to="/">Login</Link>
      </Typography>
    </Box>
  );
};

export default Register;
