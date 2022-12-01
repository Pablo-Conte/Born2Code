import { Request, Response } from "express";
import mail from "./services/mail";

class controller {
  async control(request: Request, response: Response): Promise<Response> {
    const message = Object.assign({}, request.body);

    mail.to = message.to;
    mail.subject = message.subject;
    mail.message = message.message;
    let result = mail.sendMail();

    return response.status(200).json({ result: result });
  }
}

export { controller };
