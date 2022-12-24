import { Request, Response } from "express";

import { PayBillService } from "./PayBillService";

class PayBillController {
  async control(request: Request, response: Response): Promise<Response> {
    const billId = request.headers["x-bill-id"] as string;

    const payBillService = new PayBillService();

    await payBillService.execute({ billId });

    return response.status(204).send();
  }
}

export { PayBillController };
