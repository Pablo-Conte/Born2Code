import nodemailer from "nodemailer";
import config from "../configs/configs";

class Mail {
  constructor(
    public to?: string,
    public subject?: string,
    public message?: string
  ) {}

  sendMail() {
    let mailOptions = {
      from: "Administrador <4bd1ab9be0-1a8e11@inbox.mailtrap.io>",
      to: this.to,
      subject: this.subject,
      html: this.message,
    };

    var transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: false,
      auth: {
        user: config.user,
        pass: config.password,
      },
      // tls: { rejectUnauthorized: false },
    });

    console.log("mailOptions", mailOptions);

    transporter.sendMail({
      from: "Administrador <4bd1ab9be0-1a8e11@inbox.mailtrap.io>",
      to: this.to,
      subject: this.subject,
      html: this.message,
    });
  }
}

export default new Mail();
export { Mail };
