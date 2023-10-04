import React, { useState } from "react";
import { TextField, Box, Button,IconButton,FormControl,InputAdornment,InputLabel,OutlinedInput,Snackbar, Typography } from "@mui/material";
import { Link ,useNavigate} from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
//  const[p,setP]=useState("")
// const[reg,setReg]=useState({
//   username:'',
//   password:'',

// })
const[username,setUserName] = useState('')
const[password,setPassword] = useState('')
  const register=useAuth()
//  console.log("ertyui",register)
 
function handleUsername(e){
  console.log("my name is changing 🛑",e.target.value)
  setUserName(e.target.value)
}
function handlePassword(e){
  console.log("my password is changing 😁",e.target.value)
  setPassword(e.target.value)



}
  function handleRegister(e) {
    e.preventDefault();
    
      const data = JSON.parse(localStorage.getItem("userData") ||"[]" );
      console.log(username,password,"regereg")
      const userData = {
      
        name: username,
        password:password,
        
      };
       console.log(userData,"console.log for userdata")
      data.push(userData);
      setOpen(true);
      setTimeout(() => {
        Navigate("/");
      }, 1500);

      localStorage.setItem("userData", JSON.stringify(data));
      console.log(data);
 
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
        height: 300,
        mx: 55,
        my: 10,
        padding: 10,
        backgroundColor: "aliceblue",
       
      }}
    >
      <h3>Register Page</h3>
     

     <UsernameInput 
     
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

              // onBlur={(e,error)=>{setErrors((state)=>({...state,pwd:error}))}}
            />
       
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Registered successfully now login
        </Alert>
      </Snackbar>
      <Button variant="contained" onClick={handleRegister} disabled={errors.pwd}>
        Register
      </Button>
      <Typography>
        Already a user ? <Link to="/">Login</Link>
      </Typography>
    </Box>
  );
};

export default Register;
