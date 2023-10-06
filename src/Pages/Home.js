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
  CircularProgress,
  TabScrollButton,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { styled, alpha } from "@mui/material/styles";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import ProfileData from "../Profile";
import DropDown from "./DropDown";
import Content from "../Content";
import { BookmarkAddOutlined } from "@mui/icons-material";
import { Link, useNavigate, useSearchParams,useLocation } from "react-router-dom";
import { Pagination, PaginationItem } from '@mui/material';

const Home = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  
  const url = "https://api.jikan.moe/v4/anime";
  const [animeData, setAnimeData] = useState([]);
  // const [search, setSearch] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [loading, setLoading] = useState(false);
  const[handleError,setHandleError] = useState(null)
  const[handleErrorMessage,setHandleErrorMessage] = useState([])
 const navigate =useNavigate()

  // // console.log(q,"sssssssssssssssssssssss")
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
      .catch((err) =>{ console.error("Error")
// setHandleError(true)
      // setHandleErrorMessage(err.message)
    }
      
      
      );
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
    if (!wishlist.find((value) => value.title === d.title)) {
      dispatch({ type: "ADD", payload: d });
    }
  };
  function handleDdlclick(e, item) {
   
    if (!wishlist.find((value) => value.title === item.title)) {
      dispatch({ type: "ADD", payload: item });
      
    }else{
      dispatch({ type: "REMOVE", payload: item });

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

  const [searchValue, setSearchvalue] = useState("");
 
  const searchAnimeData = animeData.filter((value) =>
    value.title.toLowerCase().includes(searchItem.toLowerCase())
  );
  function handleAnime(e, option) {
    // // console.log("oiuytre");
    // // console.log("id", option.mal_id);
    const id = option.mal_id;
    // // console.log("idididiid", id);
  }

  useEffect(() => {
    let timer = setTimeout(() => {
      console.log(`API with query "${searchValue}" triggered!! 💥`);
    }, 3000);

    console.log("⏳ set new timer with value is", searchValue);

    return () => {
      clearTimeout(timer);
      console.log(
        "Unmounted/cleaned useEffect and removed timer⌚",
        searchValue
      );
    };
  }, [searchValue]);
  function handleAnimeItem(e,id){
    e.stopPropagation();
    navigate(`anime/${id}`)
  }
  return (
    <Box>
     
    {/* {
        handleError ? (<Typography>{handleErrorMessage}</Typography> 
 


        ):(   */}
        <Box>
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
   
                <DropDown />
              </Toolbar>
            </AppBar>
          </Box>
          <ProfileData />
          {loading ? (<CircularProgress/>) :' '   }
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={15}
            marginTop={2}
          >
            <Box
              sx={{
                width: 350,
                height: 280,
                m: 5,
                padding: 5,
                borderRadius: 3,
                overflowY: "scroll",
              }}
            >
              {animeData.map((anime, id) => (
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
                  // onClick={(e)=>handleAnimeItem(e,id)}
                  onDoubleClick={(e) => handleDdlclick(e, anime)}
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
                        // onDoubleClick={(e) => handleDdlclick(e, anime)}
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
    
        
    </Box>
    

        
    <Box>
                {/* <Content /> */}



                <Pagination
        page={page}
        count={10}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/inbox${item.page === 1 ? '' : `?page=${item.page}`}`}
            {...item}
          />
        )}
      />
              </Box> 
        
    </Box>
  );
};

export default Home;
