import "reflect-metadata";
import { Container } from "inversify";
import { bindings } from "./ioc/inversify.bindings";
import { InversifyExpressServer } from "inversify-express-utils";

require('dotenv').config();

(async () => {
  const PORT = process.env.SERVER_PORT ? Number.parseInt(process.env.SERVER_PORT) : 8000;
  const HOST = process.env.SERVER_HOST || 'localhost';

  const container = new Container();
  await container.loadAsync(bindings);

  const app = new InversifyExpressServer(container);
  const server = app.build();

  server.listen(PORT, HOST, () => {
    console.log(`Server is running at https://${HOST}:${PORT}`);
  });
})()