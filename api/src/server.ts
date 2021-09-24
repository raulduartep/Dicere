import 'reflect-metadata';
import 'dotenv/config';

import '@shared/container';

import { createServer } from 'http';

import { httpApp } from '@infra/http/app';
import { WebSocketApp } from '@infra/websocket/app';

import createConnection from './infra/typeorm';

createConnection();

const port = process.env.SERVER_PORT || 3333;

const server = createServer(httpApp);
new WebSocketApp(server).run();

server.listen(port, () => {
  console.log(`Server is running in port ${port}`);
});
