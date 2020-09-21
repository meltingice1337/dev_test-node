import "reflect-metadata";
import { Application, Request,Response,NextFunction } from "express";
import bodyParser from "body-parser";
import { Container } from "inversify";
import { bindings } from "./ioc/inversify.bindings";
import { InversifyExpressServer } from "inversify-express-utils";
import { exceptionMiddleware } from "./middlewares/exceptionMiddleware";

require('dotenv').config();

(async () => {
  const PORT = process.env.SERVER_PORT ? Number.parseInt(process.env.SERVER_PORT) : 8000;
  const HOST = process.env.SERVER_HOST || 'localhost';

  const container = new Container();
  await container.loadAsync(bindings);

  const inverisfyApp = new InversifyExpressServer(container);

  inverisfyApp.setConfig((app) => {
    app.use(bodyParser.json())
  })

  inverisfyApp.setErrorConfig((app) => {
    app.use(exceptionMiddleware);
  });

  const server = inverisfyApp.build();

  server.listen(PORT, HOST, () => {
    console.log(`Server is running at https://${HOST}:${PORT}`);
  });
})()