import dotenv from "dotenv";

import WebSocket from "ws";

dotenv.config();

console.log("hello");

const ws = new WebSocket(
  `wss://rinkeby.infura.io/ws/v3/${process.env.INFURA_PROJECT_ID}`
);



ws.on("open", function open() {
  ws.send(
    '{"jsonrpc":"2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}'
  );
});

ws.on("message", function incoming(data) {
  var obj = JSON.parse(data);
  console.log(obj);
//   ws.close();
});
