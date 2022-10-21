import { Router } from "express";

import { CreateUserController } from "../../modules/accounts/useCases/CreateUser/CreateUserController";
import { DeleteUserController } from "../../modules/accounts/useCases/DeleteUser/DeleteUserController";
import { LogoutUserController } from "../../modules/accounts/useCases/LogoutUser/LogoutUserController";
import { ReadAllController } from "../../modules/accounts/useCases/ReadAllUser/ReadAllController";
import { ReadUserController } from "../../modules/accounts/useCases/ReadUser/ReadUserController";
import { ToggleAdminController } from "../../modules/accounts/useCases/ToggleAdmin/ToggleAdminController";
import { UpdateUserController } from "../../modules/accounts/useCases/UpdateUser/UpdateUserController";
import { UserLoginController } from "../../modules/accounts/useCases/UserLogin/UserLoginController";
import { authSecurity } from "../middlewares/authSecurity";

const userRoutes = Router();

const readAllController = new ReadAllController();
const readUserController = new ReadUserController();
const userLoginController = new UserLoginController();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const logoutUserController = new LogoutUserController();
const toggleAdminController = new ToggleAdminController();

// accounts ---------------------------------------------------------------------------
userRoutes.post("/create", createUserController.control);

userRoutes.get("/read", authSecurity, readUserController.control);

userRoutes.put("/update", authSecurity, updateUserController.control);

userRoutes.delete("/delete", authSecurity, deleteUserController.control);

userRoutes.post("/login", userLoginController.control);

userRoutes.put("/logout", authSecurity, logoutUserController.control);

userRoutes.put(
  "/toggleAdmin",
  authSecurity,
  toggleAdminController.control
);

userRoutes.get("/readAll", authSecurity, readAllController.control);
//-------------------------------------------------------------------------------------

export { userRoutes };
