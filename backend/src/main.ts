import "reflect-metadata";
import { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from 'cors';

import { InversifyExpressServer } from "inversify-express-utils";

import { containerFactory } from "./ioc/inversify.config";

import { exceptionMiddleware } from "./middlewares/exception.middleware";
import { validateJWT } from "./middlewares/validateJWT";

require('dotenv').config();

(async () => {
  const PORT = process.env.SERVER_PORT ? Number.parseInt(process.env.SERVER_PORT) : 8000;
  const HOST = process.env.SERVER_HOST || 'localhost';

  const container = await containerFactory();
  const inverisfyApp = new InversifyExpressServer(container);

  inverisfyApp.setConfig((app) => {
    app.use(cors())
    app.use(bodyParser.json())
    app.use(validateJWT(container))
  })

  inverisfyApp.setErrorConfig((app) => {
    app.use(exceptionMiddleware);
  });

  const server = inverisfyApp.build();

  server.listen(PORT, HOST, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
  });
})()