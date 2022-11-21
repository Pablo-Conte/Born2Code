import { LogoutUserController } from "@modules/sessions/useCases/LogoutUser/LogoutUserController";
import { UserLoginController } from "@modules/sessions/useCases/UserLogin/UserLoginController";
import { authSecurity } from "@shared/middlewares/authSecurity";
import { Router } from "express";

const sessionRoutes = Router();

const userLoginController = new UserLoginController();
const logoutUserController = new LogoutUserController();

sessionRoutes.post("/login", userLoginController.control);
sessionRoutes.put("/logout", authSecurity, logoutUserController.control);

export { sessionRoutes };
