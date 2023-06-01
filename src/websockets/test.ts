import { AxiosResponse } from 'axios';
import websocket from 'websocket';

const url = {
  getPublicWebsocketToken: '/api/v1/bullet-public',
  getPrivateWebsocketToken: '/api/v1/bullet-private',
};

export const createWebsocketTokenRequest = (
  post: (endpoint: string, body: any) => Promise<AxiosResponse>,
) => ({
  getPublicWebsocketToken: async () => post(url.getPublicWebsocketToken, {}),
  getPrivateWebsocketToken: async () => post(url.getPrivateWebsocketToken, {}),
  openWebsocket: (endpoint: IOpenWebsocket) => openWebsocket(endpoint),
});

const openWebsocket = ({ endpoint, token }: IOpenWebsocket): websocket.w3cwebsocket => {
  if (!endpoint || !token) throw new Error('No endpoint or token provided');

  const url = `${endpoint}?token=${token}`;
  const ws = new websocket.w3cwebsocket(url);

  return ws;
};

export type IOpenWebsocket = {
  endpoint: string;
  token: string;
};
