// import assert from 'assert';
// import { createClient } from 'redis';

// const client = createClient();
// await client.connect();

const client = require("./client");

async function init() {


const res1 = await client.zAdd('racer_scores', { score: 10, value: 'Norem' });
console.log(res1);  // >>> 1

const res2 = await client.zAdd('racer_scores', { score: 12, value: 'Castilla' });
console.log(res2);  // >>> 1

const res3 = await client.zAdd('racer_scores', [
  { score: 8, value: 'Sam-Bodden' },
  { score: 10, value: 'Royce' },
  { score: 6, value: 'Ford' },
  { score: 14, value: 'Prickett' },
  { score: 12, value: 'Castilla' }
]);
console.log(res3);  // >>> 4



const res4 = await client.zRange('racer_scores', 0, -1);
console.log(res4);  // >>> ['Ford', 'Sam-Bodden', 'Norem', 'Royce', 'Castilla', 'Prickett']


const res6 = await client.zRangeWithScores('racer_scores', 0, -1);
console.log(res6);
// >>> [
//       { value: 'Ford', score: 6 }, { value: 'Sam-Bodden', score: 8 },
//       { value: 'Norem', score: 10 }, { value: 'Royce', score: 10 },
//       { value: 'Castilla', score: 12 }, { value: 'Prickett', score: 14 }
// ]


const res7 = await client.zRangeByScore('racer_scores', '-inf', 10);
console.log(res7);  // >>> ['Ford', 'Sam-Bodden', 'Norem', 'Royce']


const res8 = await client.zRem('racer_scores', 'Castilla');
console.log(res8);  // >>> 1

const res9 = await client.zRemRangeByScore('racer_scores', '-inf', 9);
console.log(res9);  // >>> 2


const res10 = await client.zRange('racer_scores', 0, -1);
console.log(res10);  // >>> ['Norem', 'Royce', 'Prickett']



const res11 = await client.zRank('racer_scores', 'Norem');
console.log(res11);  // >>> 0

const res12 = await client.zRevRank('racer_scores', 'Norem');
console.log(res12);  // >>> 2

const res13 = await client.zAdd('racer_scores', [
  { score: 0, value: 'Norem' },
  { score: 0, value: 'Sam-Bodden' },
  { score: 0, value: 'Royce' },
  { score: 0, value: 'Ford' },
  { score: 0, value: 'Prickett' },
  { score: 0, value: 'Castilla' }
]);
console.log(res13);  // >>> 3


const res14 = await client.zRange('racer_scores', 0, -1);
console.log(res14);  // >>> ['Castilla', 'Ford', 'Norem', 'Prickett', 'Royce', 'Sam-Bodden']

const res15 = await client.zRangeByLex('racer_scores', '[A', '[L');
console.log(res15);  // >>> ['Castilla', 'Ford']


const res16 = await client.zAdd('racer_scores', { score: 100, value: 'Wood' });
console.log(res16);  // >>> 1

const res17 = await client.zAdd('racer_scores', { score: 100, value: 'Henshaw' });
console.log(res17);  // >>> 1

const res18 = await client.zAdd('racer_scores', { score: 150, value: 'Henshaw' }, { nx: true });
console.log(res18);  // >>> 0

const res19 = await client.zIncrBy('racer_scores', 50, 'Wood');
console.log(res19);  // >>> 150.0

const res20 = await client.zIncrBy('racer_scores', 50, 'Henshaw');
console.log(res20);  // >>> 200.0

}

init();