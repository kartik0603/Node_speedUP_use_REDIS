const client = require("./client");

async function init() {


const res1 = await client.xadd(
  'race:france', '*', {
    'rider': 'Castilla',
    'speed': '30.2',
    'position': '1',
    'location_id': '1'
  }
);
console.log(res1); // >>> 1700073067968-0 N.B. actual values will differ from these examples

const res2 = await client.xAdd(
  'race:france', '*', {
    'rider': 'Norem',
    'speed': '28.8',
    'position': '3',
    'location_id': '1'
  },
);
console.log(res2); // >>> 1692629594113-0

const res3 = await client.xAdd(
  'race:france', '*', {
    'rider': 'Prickett',
    'speed': '29.7',
    'position': '2',
    'location_id': '1'
  },
);
console.log(res3); // >>> 1692629613374-0


const res4 = await client.xRange('race:france', '1691765278160-0', '+', {COUNT: 2});
console.log(res4); // >>> [('1692629576966-0', {'rider': 'Castilla', 'speed': '30.2', 'position': '1', 'location_id': '1'}), ('1692629594113-0', {'rider': 'Norem', 'speed': '28.8', 'position': '3', 'location_id': '1'})]

const res5 = await client.xRead({
  key: 'race:france',
  id: '0-0'
}, {
  count: 100,
  block: 300
});
console.log(res5); // >>> [['race:france', [('1692629576966-0', {'rider': 'Castilla', 'speed': '30.2', 'position': '1', 'location_id': '1'}), ('1692629594113-0', {'rider': 'Norem', 'speed': '28.8', 'position': '3', 'location_id': '1'}), ('1692629613374-0', {'rider': 'Prickett', 'speed': '29.7', 'position': '2', 'location_id': '1'})]]]

const res6 = await client.xAdd(
  'race:france', '*', {
    'rider': 'Castilla',
    'speed': '29.9',
    'position': '1',
    'location_id': '2'
  }
);
console.log(res6); // >>> 1692629676124-0

const res7 = await client.xLen('race:france');
console.log(res7); // >>> 4


const res8 = await client.xAdd('race:usa', '0-1', {
  'racer': 'Castilla'
});
console.log(res8); // >>> 0-1

const res9 = await client.xAdd('race:usa', '0-2', {
  'racer': 'Norem'
});
console.log(res9); // >>> 0-2

try {
  const res10 = await client.xAdd('race:usa', '0-1', {
    'racer': 'Prickett'
  });
  console.log(res10); // >>> 0-1
} catch (error) {
  console.error(error); // >>> WRONGID
}

const res11a = await client.xAdd('race:usa', '0-*', { racer: 'Norem' });
console.log(res11a); // >>> 0-3

const res11 = await client.xRange('race:france', '-', '+');
console.log(res11); // >>> [('1692629576966-0', {'rider': 'Castilla', 'speed': '30.2', 'position': '1', 'location_id': '1'}), ('1692629594113-0', {'rider': 'Norem', 'speed': '28.8', 'position': '3', 'location_id': '1'}), ('1692629613374-0', {'rider': 'Prickett', 'speed': '29.7', 'position': '2', 'location_id': '1'}), ('1692629676124-0', {'rider': 'Castilla', 'speed': '29.9', 'position': '1', 'location_id': '2'})]

const res12 = await client.xRange('race:france', '1692629576965', '1692629576967');
console.log(res12); // >>> [('1692629576966-0', {'rider': 'Castilla', 'speed': '30.2', 'position': '1', 'location_id': '1'})]

const res13 = await client.xRange('race:france', '-', '+', {COUNT: 2});
console.log(res13); // >>> [('1692629576966-0', {'rider': 'Castilla', 'speed': '30.2', 'position': '1', 'location_id': '1'}), ('1692629594113-0', {'rider': 'Norem', 'speed': '28.8', 'position': '3', 'location_id': '1'})]

const res14 = await client.xRange('race:france', '(1692629594113-0', '+', {COUNT: 2});
console.log(res14); // >>> [('1692629613374-0', {'rider': 'Prickett', 'speed': '29.7', 'position': '2', 'location_id': '1'}), ('1692629676124-0', {'rider': 'Castilla', 'speed': '29.9', 'position': '1', 'location_id': '2'})]

const res15 = await client.xRange('race:france', '(1692629676124-0', '+', {COUNT: 2});
console.log(res15); // >>> []

const res16 = await client.xRevRange('race:france', '+', '-', {COUNT: 1});
console.log(
  res16
); // >>> [('1692629676124-0', {'rider': 'Castilla', 'speed': '29.9', 'position': '1', 'location_id': '2'})]

const res17 = await client.xRead({
  key: 'race:france',
  id: '0-0'
}, {
  count: 2
});
console.log(res17); // >>> [['race:france', [('1692629576966-0', {'rider': 'Castilla', 'speed': '30.2', 'position': '1', 'location_id': '1'}), ('1692629594113-0', {'rider': 'Norem', 'speed': '28.8', 'position': '3', 'location_id': '1'})]]]

const res18 = await client.xGroupCreate('race:france', 'france_riders', '$');
console.log(res18); // >>> True

const res19 = await client.xGroupCreate('race:italy', 'italy_riders', '$', {
  'MKSTREAM': true
});
console.log(res19); // >>> True

await client.xAdd('race:italy', '*', {
  'rider': 'Castilla'
});
await client.xAdd('race:italy', '*', {
  'rider': 'Royce'
});
await client.xAdd('race:italy', '*', {
  'rider': 'Sam-Bodden'
});
await client.xAdd('race:italy', '*', {
  'rider': 'Prickett'
});
await client.xAdd('race:italy', '*', {
  'rider': 'Norem'
});

const res20 = await client.xReadGroup(
  'italy_riders',
  'Alice', {
    key: 'race:italy',
    id: '>'
  }, {
    'COUNT': 1
  }
);
console.log(res20); // >>> [['race:italy', [('1692629925771-0', {'rider': 'Castilla'})]]]

const res21 = await client.xReadGroup(
  'italy_riders',
  'Alice', {
    key: 'race:italy',
    id: '0'
  }, {
    'COUNT': 1
  }
);
console.log(res21); // >>> [['race:italy', [('1692629925771-0', {'rider': 'Castilla'})]]]

const res22 = await client.xAck('race:italy', 'italy_riders', '1692629925771-0')
console.log(res22); // >>> 1

const res23 = await client.xReadGroup(
  'italy_riders',
  'Alice', {
    key: 'race:italy',
    id: '0'
  }, {
    'COUNT': 1
  }
);
console.log(res23); // >>> [['race:italy', []]]

const res24 = await client.xReadGroup(
  'italy_riders',
  'Bob', {
    key: 'race:italy',
    id: '>'
  }, {
    'COUNT': 2
  }
);
console.log(res24); // >>> [['race:italy', [('1692629925789-0', {'rider': 'Royce'}), ('1692629925790-0', {'rider': 'Sam-Bodden'})]]]

const res25 = await client.xPending('race:italy', 'italy_riders');
console.log(res25); // >>> {'pending': 2, 'min': '1692629925789-0', 'max': '1692629925790-0', 'consumers': [{'name': 'Bob', 'pending': 2}]}

const res26 = await client.xPendingRange('race:italy', 'italy_riders', '-', '+', 10);
console.log(res26); // >>> [{'message_id': '1692629925789-0', 'consumer': 'Bob', 'time_since_delivered': 31084, 'times_delivered': 1}, {'message_id': '1692629925790-0', 'consumer': 'Bob', 'time_since_delivered': 31084, 'times_delivered': 1}]

const res27 = await client.xRange('race:italy', '1692629925789-0', '1692629925789-0');
console.log(res27); // >>> [('1692629925789-0', {'rider': 'Royce'})]

const res28 = await client.xClaim(
  'race:italy', 'italy_riders', 'Alice', 60000, ['1692629925789-0']
);
console.log(res28); // >>> [('1692629925789-0', {'rider': 'Royce'})]

const res29 = await client.xAutoClaim('race:italy', 'italy_riders', 'Alice', 1, '0-0', 1);
console.log(res29); // >>> ['1692629925790-0', [('1692629925789-0', {'rider': 'Royce'})]]

const res30 = await client.xAutoClaim(
  'race:italy', 'italy_riders', 'Alice', 1, '(1692629925789-0', 1
);
console.log(res30); // >>> ['0-0', [('1692629925790-0', {'rider': 'Sam-Bodden'})]]

const res31 = await client.xInfoStream('race:italy');
console.log(res31); // >>> {'length': 5, 'radix-tree-keys': 1, 'radix-tree-nodes': 2, 'last-generated-id': '1692629926436-0', 'groups': 1, 'first-entry': ('1692629925771-0', {'rider': 'Castilla'}), 'last-entry': ('1692629926436-0', {'rider': 'Norem'})}

const res32 = await client.xInfoGroups('race:italy');
console.log(res32); // >>> [{'name': 'italy_riders', 'consumers': 2, 'pending': 2, 'last-delivered-id': '1692629925790-0'}]

const res33 = await client.xInfoConsumers('race:italy', 'italy_riders');
console.log(res33); // >>> [{'name': 'Alice', 'pending': 2, 'idle': 199332}, {'name': 'Bob', 'pending': 0, 'idle': 489170}]

await client.xAdd('race:italy', '*', {
  'rider': 'Jones'
}, {
  'MAXLEN': 2
});
await client.xAdd('race:italy', '*', {
  'rider': 'Wood'
}, {
  'MAXLEN': 2
});
await client.xAdd('race:italy', '*', {
  'rider': 'Henshaw'
}, {
  'MAXLEN': 2
});

const res34 = await client.xLen('race:italy');
console.log(res34); // >>> 8

const res35 = await client.xRange('race:italy', '-', '+');
console.log(res35); // >>> [('1692629925771-0', {'rider': 'Castilla'}), ('1692629925789-0', {'rider': 'Royce'}), ('1692629925790-0', {'rider': 'Sam-Bodden'}), ('1692629925791-0', {'rider': 'Prickett'}), ('1692629926436-0', {'rider': 'Norem'}), ('1692630612602-0', {'rider': 'Jones'}), ('1692630641947-0', {'rider': 'Wood'}), ('1692630648281-0', {'rider': 'Henshaw'})]

await client.xAdd('race:italy', '*', {
  'rider': 'Smith'
}, {
  'MAXLEN': 2,
  'APPROXIMATE': false
});

const res36 = await client.xRange('race:italy', '-', '+');
console.log(res36); // >>> [('1692630648281-0', {'rider': 'Henshaw'}), ('1692631018238-0', {'rider': 'Smith'})]

const res37 = await client.xTrim('race:italy', 'MAXLEN', 10, {
  'APPROXIMATE': false
});
console.log(res37); // >>> 0

const res38 = await client.xTrim('race:italy', "MAXLEN", 10);
console.log(res38); // >>> 0

const res39 = await client.xRange('race:italy', '-', '+');
console.log(res39); // >>> [('1692630648281-0', {'rider': 'Henshaw'}), ('1692631018238-0', {'rider': 'Smith'})]

const res40 = await client.xDel('race:italy', '1692631018238-0');
console.log(res40); // >>> 1

const res41 = await client.xRange('race:italy', '-', '+');
console.log(res41); // >>> [('1692630648281-0', {'rider': 'Henshaw'})]

}

init();