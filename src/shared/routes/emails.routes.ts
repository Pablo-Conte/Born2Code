import { controller } from "@modules/emails/controller";
import { Router } from "express";

const emailsRoutes = Router();

const controler = new controller();

emailsRoutes.post("/send", controler.control);

export { emailsRoutes };
