// import assert from 'assert';
// import { createClient } from 'redis';

// const client = createClient();
// await client.connect();

const client = require("./client");
async function init() {
  const stations = [
    {
      longitude: -122.27652,
      latitude: 37.805186,
      member: "station:1",
    },
    {
      longitude: -122.2674626,
      latitude: 37.8062344,
      member: "station:2",
    },
    {
      longitude: -122.2469854,
      latitude: 37.8104049,
      member: "station:3",
    },
  ];

  const res1 = await client.geoAdd("bikes:rentable", stations);
  console.log(res1); // 3

  const res2 = await client.geoSearch(
    "bikes:rentable",
    {
      longitude: -122.27652,
      latitude: 37.805186,
    },
    { radius: 5, unit: "km" }
  );
  console.log(res2); // ['station:1', 'station:2', 'station:3']

  await client.quit();
}

init();
