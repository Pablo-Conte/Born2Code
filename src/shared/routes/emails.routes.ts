import { Controller } from "@modules/emails/Controller";
import { Router } from "express";

const emailsRoutes = Router();

const controller = new Controller();

emailsRoutes.post("/send", controller.control);

export { emailsRoutes };
