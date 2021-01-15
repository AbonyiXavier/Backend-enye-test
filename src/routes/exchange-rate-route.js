const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/", async (request, response) => {
  try {
    const getAllRates = await fetch("https://api.exchangeratesapi.io/latest");
    const resultsJson = await getAllRates.json();

    if (request.query) {
      let { base, currency } = request.query;
      const ratesValue = await fetch(
        `https://api.exchangeratesapi.io/latest?base=${base}&currency=${currency}`
      );
      const res = await ratesValue.json();
      const rates = {};
      currency.split(",").map((val) => {
        if (!res.rates[val]) {
          return response.status(400).json({
            message: "Be sure all currencies entered are correct",
          });
        }
        return (rates[val] = res.rates[val]);
      });

      return response.status(200).json({
        results: {
          base: res.base,
          date: res.date,
          rates,
        },
      });
    }
    return response.status(200).json(resultsJson);
  } catch (error) {
    response.status(500).json(error.message);
  }
});

module.exports = router;
