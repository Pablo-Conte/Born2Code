import { Router } from "express";

import { CreateUserController } from "../../modules/accounts/useCases/CreateUser/CreateUserController";
import { DeleteUserController } from "../../modules/accounts/useCases/DeleteUser/DeleteUserController";
import { ReadAllController } from "../../modules/accounts/useCases/ReadAllUser/ReadAllController";
import { ReadUserController } from "../../modules/accounts/useCases/ReadUser/ReadUserController";
import { ToggleAdminController } from "../../modules/accounts/useCases/ToggleAdmin/ToggleAdminController";
import { UpdateUserController } from "../../modules/accounts/useCases/UpdateUser/UpdateUserController";
import { authSecurity } from "../middlewares/authSecurity";

const userRoutes = Router();

const readAllController = new ReadAllController();
const readUserController = new ReadUserController();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const toggleAdminController = new ToggleAdminController();

userRoutes.post("/create", createUserController.control);
userRoutes.get("/read", authSecurity, readUserController.control);
userRoutes.get("/readAll", authSecurity, readAllController.control);
userRoutes.put("/update", authSecurity, updateUserController.control);
userRoutes.put("/toggleAdmin", authSecurity, toggleAdminController.control);
userRoutes.delete("/delete", authSecurity, deleteUserController.control);

export { userRoutes };
