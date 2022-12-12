import { Router } from "express";

import { PayBillController } from "../../modules/billsToPay/useCases/PayBill/PayBillController";
import { authSecurity } from "../middlewares/authSecurity";

const billsRoutes = Router();

const payBillController = new PayBillController();

billsRoutes.put("/pay", authSecurity, payBillController.control);

export { billsRoutes };
