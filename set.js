// import assert from 'assert';
// import { createClient } from 'redis';

// const client = await createClient();
// await client.connect();

const client = require("./client");
async function init() {

const res1 = await client.sAdd('bikes:racing:france', 'bike:1')
console.log(res1)  // >>> 1

const res2 = await client.sAdd('bikes:racing:france', 'bike:1')
console.log(res2)  // >>> 0
const res3 = await client.sAdd('bikes:racing:france', ['bike:2', 'bike:3'])
console.log(res3)  // >>> 2
const res4 = await client.sAdd('bikes:racing:usa', ['bike:1', 'bike:4'])
console.log(res4)  // >>> 2


await client.del('bikes:racing:france')
await client.del('bikes:racing:usa')
await client.sAdd('bikes:racing:france', 'bike:1', 'bike:2', 'bike:3')
await client.sAdd('bikes:racing:usa', 'bike:1', 'bike:4')
const res5 = await client.sIsMember('bikes:racing:usa', 'bike:1')
console.log(res5)  // >>> true

const res6 = await client.sIsMember('bikes:racing:usa', 'bike:2')
console.log(res6)  // >>> false


await client.del('bikes:racing:france')
await client.del('bikes:racing:usa')
await client.sAdd('bikes:racing:france', 'bike:1', 'bike:2', 'bike:3')
await client.sAdd('bikes:racing:usa', 'bike:1', 'bike:4')
const res7 = await client.sInter('bikes:racing:france', 'bikes:racing:usa')
console.log(res7)  // >>> {'bike:1'}


await client.del('bikes:racing:france')
await client.sAdd('bikes:racing:france', ['bike:1', 'bike:2', 'bike:3'])
const res8 = await client.sCard('bikes:racing:france')
console.log(res8)  // >>> 3


const res9 = await client.sAdd('bikes:racing:france', ['bike:1', 'bike:2', 'bike:3'])
console.log(res9)  // >>> 3

const res10 = await client.sMembers('bikes:racing:france')
console.log(res10)  // >>> ['bike:1', 'bike:2', 'bike:3']


const res11 = await client.sIsMember('bikes:racing:france', 'bike:1')
console.log(res11)  // >>> true

const res12 = await client.smIsMember('bikes:racing:france', ['bike:2', 'bike:3', 'bike:4'])
console.log(res12)  // >>> [true, true, false]


await client.sAdd('bikes:racing:france', ['bike:1', 'bike:2', 'bike:3'])
await client.sAdd('bikes:racing:usa', ['bike:1', 'bike:4'])
const res13 = await client.sDiff(['bikes:racing:france', 'bikes:racing:usa'])
console.log(res13)  // >>> [ 'bike:2', 'bike:3' ]


await client.sAdd('bikes:racing:france', ['bike:1', 'bike:2', 'bike:3'])
await client.sAdd('bikes:racing:usa', ['bike:1', 'bike:4'])
await client.sAdd('bikes:racing:italy', ['bike:1', 'bike:2', 'bike:3', 'bike:4'])

const res14 = await client.sInter(
  ['bikes:racing:france', 'bikes:racing:usa', 'bikes:racing:italy']
)
console.log(res14)  // >>> ['bike:1']

const res15 = await client.sUnion(
  ['bikes:racing:france', 'bikes:racing:usa', 'bikes:racing:italy']
)
console.log(res15)  // >>> ['bike:1', 'bike:2', 'bike:3', 'bike:4']

const res16 = await client.sDiff(['bikes:racing:france', 'bikes:racing:usa', 'bikes:racing:italy'])
console.log(res16)  // >>> []

const res17 = await client.sDiff(['bikes:racing:usa', 'bikes:racing:france'])
console.log(res17)  // >>> ['bike:4']

const res18 = await client.sDiff(['bikes:racing:france', 'bikes:racing:usa'])
console.log(res18)  // >>> ['bike:2', 'bike:3']


debugger;

await client.sAdd('bikes:racing:france', ['bike:1', 'bike:2', 'bike:3', 'bike:4', 'bike:5'])

const res19 = await client.sRem('bikes:racing:france', 'bike:1')
console.log(res19)  // >>> 1

const res20 = await client.sPop('bikes:racing:france')
console.log(res20)  // >>> bike:3 or other random value

const res21 = await client.sMembers('bikes:racing:france')
console.log(res21)  // >>> ['bike:2', 'bike:4', 'bike:5']; depends on previous result

const res22 = await client.sRandMember('bikes:racing:france')
console.log(res22)  // >>> bike:4 or other random value

}

init();