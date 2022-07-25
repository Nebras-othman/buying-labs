const express = require("express");
const errorHandler = require("./helpers/errorHandlerMiddleware");
const destinationsRouter = require("./controllers/destinations");
const hotelsRouter = require("./controllers/hotels");
require("express-async-errors");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5500;
app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/destinations", destinationsRouter);
app.use("/hotels", hotelsRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
