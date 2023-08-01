import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import ping from "./ping";
import apiV1 from "./api";
import { internalServerError, notFound } from "./helpers/errorHandler";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();
    this.setMiddlewares();
    this.setRoutes();
    this.catchErrors();
  }

  private setMiddlewares(): void {
    this.express.use(cors());
    this.express.use(morgan("dev"));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(helmet());
    this.express.use(express.static("public"));
  }

  private setRoutes(): void {
    this.express.use("/", ping);
    this.express.use("/api/v1", apiV1);
  }

  private catchErrors(): void {
    this.express.use(notFound);
    this.express.use(internalServerError);
  }
}

export default new App().express;
