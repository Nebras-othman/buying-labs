const express = require("express");
const destinationRouter = express.Router();
const hotels = require("../data/hotels.json");

destinationRouter.get("/", (req, res, next) => {
  const { search } = req.query;

  const destinations = hotels
    .map((hotel) => hotel.destination)
    .filter(
      (destination, index, self) =>
        self.indexOf(destination) === index &&
        (search
          ? destination.toLowerCase().includes(search.toLowerCase())
          : true)
    );
  res.send(destinations);
});
module.exports = destinationRouter;
