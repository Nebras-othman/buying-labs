const express = require("express");
const hotelsRouter = express.Router();
const hotels = require("../data/hotels.json");

hotelsRouter.get("/", (req, res, next) => {
  res.send(hotels);
});
hotelsRouter.get("/search", (req, res, next) => {
  // In this example i will just support the number of Rooms and destination, as I didn't find public API that have data
  // but in a similar way we can support startDate and endDate as well as all other keys..
  const { numberOfRooms, destination } = req.query;
  // For sure this filter function wouldn't exist in a real project as we will be using the database functions to filter data
  const availableHotels = hotels.filter(
    (hotel) =>
      (destination
        ? hotel.destination.toLowerCase() === destination.toLowerCase()
        : true) &&
      (numberOfRooms ? hotel.availableRooms >= numberOfRooms : true)
  );
  res.send(availableHotels);
});
module.exports = hotelsRouter;
