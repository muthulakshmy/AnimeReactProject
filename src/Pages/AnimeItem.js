import {
  Typography,
  Box,
  CardMedia,
  Stack,
  Divider,
  Card,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Link from "@mui/material/Link";

const AnimeItem = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState([]);
  useEffect(() => {
    axios
      .get(`https://api.jikan.moe/v4/anime/${id}`)
      .then((res) => {
        setAnime(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => console.error("Error"));
  }, [id]);
  return (
    <Box sx={{ backgroundColor: "#f2e6ff" }}>
      <Box sx={{ backgroundColor: "blueviolet", color: "white" }}>
        <Typography variant="h6" component="h6">
          {anime.title}
        </Typography>
      </Box>
      <Box>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={10}
          marginTop={2}
        >
          <Box
            elevation={8}
            sx={{
              // width: 350,
              // height: 300,
              m: 5,
              padding: 5,
              borderRadius: 3,
            }}
          >
            {/* <CardMedia
                component="img"
                image={anime.images.jpg.image_url}
                height="300px"
                // width="300px"
                alt={anime.title}
              /> 
               
              
              {/* <Typography>Genre : {anime.genres.map((value)=>(value.name))}</Typography> */}

            {anime.images &&
            anime.images.webp &&
            anime.images.webp.image_url ? (
              <CardMedia
                component="img"
                sx={{ width: 400, height: 400 }}
                image={anime.images.webp.image_url}
                alt={anime.title}
              />
            ) : (
              <Typography>{anime.title}</Typography>
            )}
          </Box>

          <Box
            elevation={8}
            sx={{
            //   width: 550,
            //   height: 300,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              borderRadius: 3,
            }}
          >
            <Typography variant="h6" sx={{ color: "blueviolet" }}>
              {anime.title}
            </Typography>
          
            <Typography variant="h6" sx={{ color: "blueviolet" }}>
              {anime.title_japanese}
            </Typography>
            {/* {anime.title_synonyms && anime.title_synonyms[0]  (
              <Typography variant="h6" sx={{ color: "blueviolet" }}>Genre : {anime.title_synonyms[0]} </Typography>
            )} */}
            <Typography> {anime.episodes}</Typography>
            <Typography>Score : {anime.score}</Typography>
            <Typography>Duration : {anime.duration}</Typography>
            <Typography>Rating : {anime.rating}</Typography>
            <Typography>Rank : {anime.rank}</Typography>
            <Typography>Popularity : {anime.popularity}</Typography>
            <Typography>Members : {anime.members}</Typography>
            <Typography>favorites : {anime.favorites}</Typography>
            {anime.genres && anime.genres[0] && (
              <Typography>Genre : {anime.genres[0].name} </Typography>
            )}

          {anime.aired && anime.aired.string && (
                <Typography>Aired : {anime.aired.string} </Typography>
            )}
            <Typography></Typography>
            <Typography></Typography>
          </Box>
        </Stack>
        <Box
          sx={{
            marginTop: 5,
          }}
        >
          <Typography variant="h6" sx={{ color: "blueviolet" }}>
            Description :{" "}
          </Typography>
          <Typography sx={{color:""}}>{anime.synopsis}</Typography>
         
         {

         }
          <Typography>
            Trailer :{" "}
            {anime.trailer && anime.trailer.url && (
              <Link href={anime.trailer.url}>{anime.trailer.url}</Link>
            )}{" "}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AnimeItem;
