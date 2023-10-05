import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  Stack,
  Divider,
  Typography,
  InputBase,
  TextField,
  Autocomplete,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ProfileData from "../Profile";
import { BookmarkAddOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
const Home = () => {
  const url = "https://api.jikan.moe/v4/anime";
  const [animeData, setAnimeData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [loading, setLoading] = useState(false);
  const[list, setList] = useState('')
  const reducer = (state, action) => {
    switch (action.type) {
      case "ADD":
        if (!state.includes(action.payload)) {
          return [...state, { ...action.payload }];
        }
        return state;
      case "REMOVE":
        return state.filter((anime) => anime.title !== action.payload.title);
      default:
        return state;
    }
  };

  const [wishlist, dispatch] = useReducer(reducer, []);

  const getData = () => {
    setLoading(true);
    axios
      .get(`${url}`)
      .then((res) => {
        setAnimeData(res.data.data);
        setLoading(false);
      })
      .catch((err) => console.error("Error"));
  };

  useEffect(() => {
    getData();
  }, []);

  const onDragStart = (e, anime) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(anime));
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    const d = JSON.parse(e.dataTransfer.getData("text/plain"));
    console.log(d, "ddddddddddddd");
    console.log(animeData[d], "animedata[d]");
    if (!wishlist.find((value) => value.title === d.title)) {
      dispatch({ type: "ADD", payload: d });
    }
  };
  function handleDdlclick(e, item) {
    console.log("onDoubleClick");
    if (!wishlist.find((value) => value.title === item.title)) {
      dispatch({ type: "ADD", payload: item });
    }
  }
  const removeFromWishlist = (anime) => {
    dispatch({ type: "REMOVE", payload: anime });
  };



  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));
function handleAnimePage(event,value){
  // setSearchItem(e.target.value)
  console.log(value,"target")
  const data=value
  axios.get(`${url}?q=${data}`)
  .then((res)=>setAnimeData(res.data.data))
  .then((err)=>console.error(err))



}
const searchAnimeData = animeData.filter((value) =>
value.title.toLowerCase().includes(searchItem.toLowerCase())
);
function handleAnime(e,option){
  console.log("oiuytre")
  console.log("id",option.mal_id)
  const id=option.mal_id
  console.log("idididiid",id)
  
}
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              MY ANIME WEBAPP
            </Typography>
            
            <Autocomplete 
            
            sx={{width: "300px", backgroundColor:"white",}}
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        onInputChange={handleAnimePage}
       
        options={animeData}
        getOptionLabel={(option) => option.title}
        renderOption={(props, option) => (
          <Link to={`anime/${option.mal_id}` } style={{textDecoration:"none",color:"black"}}
          ><Box  component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props} value={option.mal_id} onClick={(e)=>handleAnime(e,option)} >
            
            <CardMedia image={option.images.jpg.small_image_url} sx={{width:"50px", height:"50px"}}   /> {option.title} ({option.mal_id}) 
          </Box>
          </Link>
        )}
        renderInput={(params) => (
          <TextField 
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
        
      />
          </Toolbar>
        </AppBar>
      </Box>
      <ProfileData />

      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={15}
        marginTop={2}
      >
        <Box
          sx={{
            width: 350,
            m: 5,
            padding: 5,
            borderRadius: 3,
          }}
        >
          {searchAnimeData.map((anime, id) => (
            <Box
              key={id}
              elevation={8}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 2,
                borderBottom: "1px solid gray",
              }}
              draggable
              onDragStart={(e) => onDragStart(e, anime)}
              onDragOver={onDragOver}
              onDrop={onDrop}
            >
              <CardMedia
                sx={{
                  height: "50px",
                  width: "50px",
                }}
                component="img"
                image={anime.images.jpg.small_image_url}
                alt={anime.title}
              />
              <Typography>{anime.title}</Typography>
              <Typography>
                {wishlist.find((item) => item.title === anime.title) ? (
                  <BookmarkAddedIcon
                    sx={{ cursor: "pointer" }}
                  ></BookmarkAddedIcon>
                ) : (
                  <BookmarkAddOutlined
                    sx={{ cursor: "pointer" }}
                    onDoubleClick={(e) => handleDdlclick(e, anime)}
                  ></BookmarkAddOutlined>
                )}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            width: 400,
            m: 5,
            padding: 5,
            borderRadius: 3,
          }}
          droppable
          onDragOver={onDragOver}
          onDrop={onDrop}
        >
          <Box
            sx={{ backgroundColor: "gray", color: "white", padding: "10px" }}
          >
            <Typography>Wishlist ❤️</Typography>
          </Box>
          {wishlist.map((anime, id) => (
            <Box
              key={id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 2,
                border: "1px solid gray",
              }}
            >
              <CardMedia
                sx={{
                  height: "50px",
                  width: "50px",
                }}
                component="img"
                image={anime.images.jpg.small_image_url}
                alt={anime.title}
              />
              <Typography>{anime.title}</Typography>
              <Typography
                onClick={() => removeFromWishlist(anime)}
                sx={{ cursor: "pointer" }}
              >
                X
              </Typography>
            </Box>
          ))}
        </Box>
      </Stack>

      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
        gap="20px"
        sx={{ marginTop: "10px" }}
      >
        {loading ? <Typography>Loading...</Typography> : " "}
        {searchAnimeData.map((anime) => (
          <Card key={anime.mal_id}>
            <Box
              elevation={8}
              sx={{
                width: 350,
                height: 300,
                m: 5,
                padding: 5,
                boxShadow: "0px 0px 4px 0.4px",
                borderRadius: 3,
                backgroundColor: "aliceblue",
                "&:hover": {
                  backgroundColor: "lightblue",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
            >
              <Typography variant="h6" component="h6">
                {anime.title}
              </Typography>
              <CardMedia
                component="img"
                image={anime.images.jpg.large_image_url}
                height="200px"
                alt={anime.title}
              />
              <Typography>{anime.title_japanese}</Typography>
              <Typography>Episodes : {anime.episodes}</Typography>
              <Typography>Score : {anime.score}</Typography>
              {/* <Typography>Genre : {anime.genres[0].name}</Typography> */}
            </Box>
          </Card>
        ))}
      </Grid>
    </>
  );
};

export default Home;
