import * as React from 'react';
import {
  Card,
  Box,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from '@mui/material';

export default function PokemonCard({ name, imageURL, types }) {
  const typeHandler = () => {
    if (types[1]) return types[0].type.name + ' | ' + types[1].type.name;
    else return types[0].type.name;
  };

  return (
    <Card
      style={{
        maxWidth: '100%',
        borderRadius: 5,
        border: 2,
        borderColor: '#212121',
      }}
    >
      <CardActionArea>
        <CardMedia
          sx={{ height: 200, backgroundSize: `contain` }}
          image={imageURL}
          title={name}
        />
        <CardContent
          sx={{
            backgroundColor: `#212121`,
            color: '#fff',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            flexDirection="row"
          >
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography gutterBottom variant="caption" component="div">
              {typeHandler()}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
