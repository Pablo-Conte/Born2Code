import { Request, Response } from "express";
import { container } from "tsyringe";

import { PayBillService } from "./PayBillService";

class PayBillController {
  async control(request: Request, response: Response): Promise<Response> {
    const billId = request.headers["x-bill-id"] as string;

    const payBillService = container.resolve(PayBillService);

    await payBillService.execute({ billId });

    return response.status(204).send();
  }
}

export { PayBillController };
