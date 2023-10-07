import { Box, Divider, Skeleton, Stack } from '@mui/material';
import React, { useState } from 'react'

const SkeletonDesign = () => {
  const [skeleton, setSkeleton] = useState(new Array(4).fill(''));

  return (
    <Box>
         <Skeleton
             variant="rectangular"
             width={1050}
             height={70}
             sx={{ m:2  }}
           />

            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={15}
              marginTop={2}
            >

              <Box
                elevation={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: 10,
                  borderBottom: "1px solid gray",
                }}
              >
                {
                  skeleton.map((value)=>(
                    <Skeleton
                    variant="rectangular"
                    width={210}
                    height={50}
                    sx={{ m: 2 }}
                  />

                  ))
                }
             
              </Box>

              <Box>
                <Skeleton
                  variant="rectangular"
                  width={400}
                  height={300}
                  sx={{ m: 2,mt:10 }}
                />
              </Box>
            </Stack>
      
    </Box>
  )
}

export default SkeletonDesign


function MySkeleton({ }) {
  return (
    <Skeleton
                  variant="rectangular"
                  width={400}
                  height={300}
                  sx={{ m: 2,mt:10 }}
                />
   
  );
}