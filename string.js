const client = require("./client");

async function init() {
//   const result = await client.get("user:3");
//   console.log(result);

//   const result2 = await client.set("user:3", "hello_how_are_you");
//   console.log(result2);

  await client.expire("user:1", 10);
//   const result3 = await client.get("user:3");
//   console.log(result3);
}
init();
