import { Box, CardMedia, Typography } from '@mui/material'
import React from 'react'

const Wishlist = ({removeFromWishlist,onDragOver,onDrop,wishlist}) => {
  return (
    <div>
        <Box
                    sx={{
                      width: 300,
                      m: 1,
                      padding: 5,
                      borderRadius: 3,
                    }}
                    droppable
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                  >
                    <Box
                      sx={{
                        backgroundColor: "gray",
                        color: "white",
                        padding: "10px",
                      }}
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
      
    </div>
  )
}

export default Wishlist
