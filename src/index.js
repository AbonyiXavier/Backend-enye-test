const express = require("express");
const dotenv = require("dotenv");

const exchangeRateRouter = require("./routes/exchange-rate-route");
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/rates", exchangeRateRouter);
z;
app.get("/", (request, response) => {
  response.status(200).json({
    status: true,
    message: "Welcome to backend-enye-test....",
  });
});

module.exports = app;
