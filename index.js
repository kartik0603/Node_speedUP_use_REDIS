const express = require("express");
const axios = require("axios").default;
const app = express();
const client = require("./client");
app.get("/", async (req, res) => {
  const cacheValue = await client.get("products");

  if (cacheValue) {
    return res.json(JSON.parse(cacheValue));
  }
  const {data} = await axios.get("https://fakestoreapi.com/products");
  await client.set("products", JSON.stringify(data));
  await client.expire("products", 20);
  return res.json(data);
});

app.listen(3000, () => {
  console.log("server started");
});