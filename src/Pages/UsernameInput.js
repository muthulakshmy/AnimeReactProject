import { FormControl, TextField ,FormHelperText} from '@mui/material';
import React, { useState } from 'react'
let errorMessage = {
    emptyField: "Please fill username",
    InvalidUsername: 
      "Minimum length must be 8 and contain atleast one character ",
  };
  let usernameValidate = /^(?=.*[A-Za-z])[A-Za-z\d!@#$%^]{8,}$/;
const UsernameInput = (props) => {
  
    const [value, setValue] = useState("");
    const [error, setError] = useState(false);
    function handleBlur(e){
        // console.log("0oiuytrewtyuiopsder")
        // console.log("MY ERROR",error)
    const {value} =e.target
    setValue(value)
    const usernameRegex=new RegExp(usernameValidate)
    setError(!usernameRegex.test(value))
    // console.log("MY lokijuytres ERROR",error)
    if(props.onBlur){
        props?.onBlur?.(e,!usernameRegex.test(value))
    }
    
      }
  return (
    <div>
        <FormControl error={error}>
       <TextField
       sx={{width:215,}}
       error={error}
        required
        id="demo-helper-text-aligned-no-helper"
        label="Username"
        {...props}
        onBlur={handleBlur}
      />
      
        
            {error &&
            (<FormHelperText sx={{width:150,}}>
                {value?errorMessage.InvalidUsername:errorMessage.emptyField}
            </FormHelperText>)
          }
      
      </FormControl>
    </div>
  )
}

export default UsernameInput
