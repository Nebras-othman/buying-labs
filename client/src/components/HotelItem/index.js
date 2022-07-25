import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import NightShelterIcon from "@mui/icons-material/NightShelter";
import React from "react";

function HotelItem({ destination, name, availableRooms, price, imageUrl }) {
  return (
    <Card sx={{ maxWidth: 600, width: "100%", margin: "10px 0" }}>
      <CardMedia
        component='img'
        height='140'
        image={imageUrl}
        alt={name + "image"}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {name}
        </Typography>
        <Typography variant='body2' component='div' color='text.secondary'>
          <Chip
            icon={<NightShelterIcon />}
            label={"Available rooms " + availableRooms}
            variant='outlined'
          />
        </Typography>
        <Typography margin="10px 0" variant='body2' color='text.secondary'>
          Destination {destination}
        </Typography>
        <Typography variant="h5" component="p" color='text.primary'>
          Price: {price}$
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'>Read more</Button>
        <Button color='primary' variant="outlined">
          Book now
        </Button>
      </CardActions>
    </Card>
  );
}

export default HotelItem;
