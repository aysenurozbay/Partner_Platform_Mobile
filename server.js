const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 8080}, () => {
  console.log('Server started...');
});
const delay = 1000;
let ws;
wss.on('connection', (socket) => {
  ws = socket;
  console.log('Client connected...');
 
  ws.on('message', receive);
});
const receive = (msg) => {
  console.log(`Received: ${msg}`);
  setTimeout(() => send(msg), delay);
};
const send = (msg) => {
  ws.send(msg);
  console.log(`Sent: ${msg}`);
};