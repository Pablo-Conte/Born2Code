import { Router } from "express";
import { CreateUserController } from "../controllers/CreateUserController";
import { UpdateUserController } from "../controllers/UpdateUserController";
import { UserLoginController } from "../controllers/UserLoginController";
import { authSecurity } from "./middlewares/authSecurity";

const router = Router();

const createUserController = new CreateUserController();
const userLoginController = new UserLoginController();
const updateUserController = new UpdateUserController();

router.post("/users/create", createUserController.control);
router.put("/users/update", authSecurity, updateUserController.control)
router.post("/users/login", userLoginController.control);


export { router };

