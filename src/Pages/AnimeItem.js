import { Typography, Box, CardMedia, Stack, Divider } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Link from "@mui/material/Link";
import YouTubeIcon from '@mui/icons-material/YouTube';
const AnimeItem = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState([]);
  const[handleError,setHandleError] = useState([])
  useEffect(() => {
    axios
      .get(`https://api.jikan.moe/v4/anime/${id}`)
      .then((res) => {
        setAnime(res.data.data);
        // // console.log(res.data.data);
      })
      .catch((err) => {console.error("Error",err)
    }
      );
  }, [id]);
  return (
    <Box sx={{ backgroundColor: "black" ,color:"white", }}>
      <Box sx={{ backgroundColor: "#ff3399", color: "black" }}>
        <Typography variant="h6" component="h6">
          {anime.title}
        </Typography>
      </Box>
      <Box>
        <Stack
          direction="row"
          divider= { <Divider  orientation="vertical" flexItem color="white" />}
          spacing={10}
          sx={{color:"white"}}
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
              <Typography sx={{fontFamily:"Cursive"}}>{anime.title}</Typography>
            )}
          </Box>

          <Box
            elevation={8}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              borderRadius: 3,

              
            }}
          >
            <Typography variant="h6" sx={{ color: "#ff3399",fontFamily:"Cursive" }}>
              {anime.title}
            </Typography>

            <Typography variant="h6" sx={{ color: "#ff3399",fontFamily:"Cursive" }}>
              {anime.title_japanese}
            </Typography>
            <Typography >Episodes :  {anime.episodes}</Typography>
            <Typography >Score : {anime.score}</Typography>
            <Typography >Duration : {anime.duration}</Typography>
            <Typography >Rating : {anime.rating}</Typography>
            <Typography >Rank : {anime.rank}</Typography>
            {anime.genres && anime.genres[0] && (
              <Typography >Genre : {anime.genres[0].name} </Typography>
            )}
            <Typography>Popularity : {anime.popularity}</Typography>
            <Typography>Members : {anime.members}</Typography>
            <Typography>favorites : {anime.favorites}</Typography>
           

            {anime.aired && anime.aired.string && (
              <Typography>Aired : {anime.aired.string} </Typography>
            )}
            <Typography>Source : {anime.source}</Typography>
            <Typography></Typography>
          </Box>
        </Stack>
        <Box
          sx={{
            marginTop: 5,
          }}
        >
          {anime.synopsis && (
            //   <Typography variant="h6" sx={{ color: "blueviolet" }}>
            //     Description :{" "}
            //   </Typography>
            //   <Typography sx={{color:""}}>{anime.synopsis}{anime.background}</Typography>
            <Box>
              <Typography variant="h6" sx={{ color: "white", }}>
                Description :{" "}
              </Typography>
              <Typography sx={{}}>
                {anime.synopsis}
                {anime.background}
              </Typography>
            </Box>
          )}
          
          {anime.trailer && anime.trailer.url && (
            <Box sx={{display:"flex",justifyContent:"center"}}>
            <YouTubeIcon sx={{width:40,color:"red"}} ></YouTubeIcon>
            <Typography sx={{ color: "#ff3399",fontFamily:"cursive" }}>
             Trailer :{" "}
              <Link href={anime.trailer.url}  sx={{color:"white"}}>{anime.trailer.url}</Link>{" "}
            </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AnimeItem;
