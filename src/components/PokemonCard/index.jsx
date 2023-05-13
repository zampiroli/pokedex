import * as React from "react";
import { Card, Box, CardContent, CardMedia, Typography } from "@mui/material";

export default function PokemonCard({ name, imageURL, types }) {
  const typeHandler = () => {
    if (types[1]) return types[0].type.name + " | " + types[1].type.name;
    else return types[0].type.name;
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 200 }} image={imageURL} title={name} />
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography gutterBottom variant="caption" component="div">
            {typeHandler()}
          </Typography>
        </Box>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
