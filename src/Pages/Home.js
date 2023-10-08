import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Box, CardMedia, Stack, Divider, Typography } from "@mui/material";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { BookmarkAddOutlined } from "@mui/icons-material";
import { Pagination, PaginationItem } from "@mui/material";

import SkeletonDesign from "./Components/Skeleton";
import Header from "./Components/Header";
import ProfileData from "../Profile";
import Wishlist from "./Components/Wishlist";
import PaginationComponent from "./Components/Pagination";

const url = "https://api.jikan.moe/v4/anime";

const Home = () => {
  const [animeData, setAnimeData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState("");
  const [loading, setLoading] = useState(true);
  const [handleError, setHandleError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [currentPage]);

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
      .get(`${url}?page=${currentPage}`)
      .then((res) => {
        setAnimeData(res.data.data);
        setLoading(false);
        setPage(res.data.pagination);
      })
      .catch((err) => {
        console.error("Error");
        setHandleError(err.message);
      });
  };

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
    } else {
      dispatch({ type: "REMOVE", payload: item });
    }
  }

  const removeFromWishlist = (anime) => {
    dispatch({ type: "REMOVE", payload: anime });
  };

  function handleAnimeItem(e, anime) {
    // e.stopPropagation();
    navigate(`anime/${anime.mal_id}`);
  }

  function handlePagination(e, item) {
    setCurrentPage(item.page);
  }
  return (
    <>
      {handleError ? (
        <Typography> ☹️ {handleError}</Typography>
      ) : (
        <Box>
          {loading ? (
            <>
              <SkeletonDesign />
            </>
          ) : (
            <Box>
              <Box>
                <Header />
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
                        onClick={(e) => handleAnimeItem(e, anime)}
                        // onDoubleClick={(e) => handleDdlclick(e, anime)}
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
                          {wishlist.find(
                            (item) => item.title === anime.title
                          ) ? (
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

                  <Wishlist
                    onDragOver={onDragOver}
                    removeFromWishlist={removeFromWishlist}
                    onDrop={onDrop}
                    wishlist={wishlist}
                  />
                </Stack>
              </Box>

              <Box>
                <PaginationComponent
                  currentPage={currentPage}
                  lastVisiblePage={page.last_visible_page}
                  handlePagination={handlePagination}
                />
              </Box>
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default Home;
