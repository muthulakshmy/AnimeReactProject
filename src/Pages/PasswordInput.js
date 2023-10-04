
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import React, { useState } from 'react'
let errorMessage = {
    emptyField: "Please fill password",
    InvalidPassword: 
      "Must contain 8 charc, 1 special char, 1 number, 1 small and capital letter",
  };
  let passwordValidate = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$~`$%^&*()_+=-])[A-Za-z\d!@#$%^]{8,}$/
const PasswordInput = (props) => {
 
      const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  function handleBlur(e){
    console.log("0oiuytrewtyuiopsder")
    console.log("MY ERROR",error)
const {value} =e.target
setValue(value)
const pwdRegex=new RegExp(passwordValidate)
setError(!pwdRegex.test(value))
console.log("MY lokijuytres ERROR",error)

if(props.onBlur){
    props?.onBlur?.(e,!pwdRegex.test(value))
}

  }
  return (
    <>
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined" error={error}>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton

                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            {...props}
            onBlur={handleBlur}
          />


            {error &&
            (<FormHelperText sx={{width:200,}}>
                {value?errorMessage.InvalidPassword:errorMessage.emptyField}
            </FormHelperText>)
          }
          </FormControl>

          
      
    </>
  )
}

export default PasswordInput
