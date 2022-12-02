import { Request, Response } from "express";
import { Mail } from "./services/mail";

class Controller {
  async control(request: Request, response: Response): Promise<Response> {
    const mail = new Mail();
    const message = Object.assign({}, request.body);

    mail.to = message.to;
    mail.subject = message.subject;
    mail.message = message.message;
    let result = mail.sendMail();

    return response.status(200).json({ result: result });
  }
}

export { Controller };
