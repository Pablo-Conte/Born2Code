import "reflect-metadata";
import "dotenv/config";
import "./container";
import "express-async-errors";
import cors from "cors"; // Permite a comunicação entre o back e o front
import express from "express";
import * as httpStatus from "http-status";
import * as bodyParser from "body-parser";
import mail from "../modules/emails/services/mail";

import { routesIndex } from "./routes";
import { errorHandler } from "@utils/errorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // isso vai passar por um middleware do próprio express onde vai comparar se os tipos que estão sendo passados são os mesmos tipos que queremos usar na aplicação.
app.use(cors());
app.use(routesIndex);

app.use(errorHandler);

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.routes();
  }
  routes() {
    this.app.route("/emails").get((req, res) => {
      res.send({ result: "version 0.0.2" });
    });

    this.app.route("/emails").post((req, res) => {
      const message = Object.assign({}, req.body);

      mail.to = message.to;
      mail.subject = message.subject;
      mail.message = message.message;
      let result = mail.sendMail();

      res.status(200).json({ result: result });
    });
  }
}

export { app, App };
