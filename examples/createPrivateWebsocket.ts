import { w3cwebsocket } from 'websocket';
import Client from '../src';
import dotenv from 'dotenv';
dotenv.config();

async function setupWebsocket() {
  const client = new Client({
    secret: process.env.SECRET as string,
    password: process.env.PASS as string,
    key: process.env.KEY as string,
  });

  const tokenInfo = await client.websocket.getPrivateWebsocketToken();
  const { token, instanceServers } = tokenInfo.data.data;

  const ws = client.websocket.openWebsocket({ endpoint: instanceServers[0].endpoint, token });

  ws.onerror = function (e: any) {
    console.log('Connection Error' + e);
  };

  ws.onopen = function () {
    console.log('WebSocket Connected');
    // you need to pink the websocket to stay alive
    setInterval(() => pingWebsocket(ws), instanceServers[0].pingInterval);

    const action = {
      id: 1545910660739,
      topic: '/spotMarket/tradeOrders',
      type: 'subscribe',
      privateChannel: true,
      response: true,
    };

    ws.send(JSON.stringify(action));
  };

  ws.onclose = function () {
    console.log('Ws Closed');
  };

  ws.onmessage = function (e) {
    console.log("Received: '" + e.data + "'");
  };
}

function pingWebsocket(ws: w3cwebsocket) {
  const action = {
    id: '1545910590801',
    type: 'ping',
  };
  ws.send(JSON.stringify(action));
}

setupWebsocket();
