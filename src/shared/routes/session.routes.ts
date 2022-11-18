import { Router } from "express";
import { LogoutUserController } from "../../modules/accounts/useCases/LogoutUser/LogoutUserController";
import { UserLoginController } from "../../modules/accounts/useCases/UserLogin/UserLoginController";
import { authSecurity } from "../middlewares/authSecurity";

const sessionRoutes = Router();

const userLoginController = new UserLoginController();
const logoutUserController = new LogoutUserController();

sessionRoutes.post("/login", userLoginController.control);
sessionRoutes.put("/logout", authSecurity, logoutUserController.control);

export { sessionRoutes };
