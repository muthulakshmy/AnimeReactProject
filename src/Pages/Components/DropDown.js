import { Autocomplete, Box, CardMedia, CircularProgress, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';

const DropDown = () => {
  const url = "https://api.jikan.moe/v4/anime";

  const [search, setSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchUrl, setSearchUrl] = useSearchParams();
  const[changeValue,setChangeValue] = useState('')
  function handleAnimePage(event, value) {
    setLoading(true);
    setChangeValue(value)
  }

  useEffect(()=>{
    let timer=setTimeout(()=>{
        axios
        .get(`${url}?q=${changeValue}`)
        .then((res) => {
          setSearch(res.data.data);
          setLoading(false);
        })
        .then((err) => console.error(err));
  

    },2000)

    return ()=>{
        clearTimeout(timer);

    }

  },[changeValue])
  return (
    <>
      
        {
          loading ? (
            <Box >

            </Box>

          ):(
            <>
             <Autocomplete
                  sx={{ width: "300px", backgroundColor: "white" }}
                  freeSolo
                  id="free-solo-2-demo"
                  disableClearable
                  onInputChange={handleAnimePage}
                  options={search}
                  getOptionLabel={(option) => option.title}
                  renderOption={(props, option) => (
                    <Link
                      to={`anime/${option.mal_id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      
                        <Box
                          component="li"
                          sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                          {...props}
                          value={option.mal_id}
                        >
                          <CardMedia
                            image={option.images.jpg.small_image_url}
                            sx={{ width: "50px", height: "50px" }}
                          />{" "}
                          {option.title} ({option.mal_id})
                        </Box>
                      
                    </Link>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search input"
                      InputProps={{
                        ...params.InputProps,
                        type: "search",
                      }}
                    />
                  )}
                />
              </>
          )
        }
      
    </>
  )
}

export default DropDown
