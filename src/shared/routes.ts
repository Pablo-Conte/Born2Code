import { Router } from "express";
import { AddAdminController } from "../modules/accounts/services/AddAdmin/AddAdminController";
import { CreateUserController } from "../modules/accounts/services/CreateUser/CreateUserController";
import { DeleteUserController } from "../modules/accounts/services/DeleteUser/DeleteUserController";
import { LogoutUserController } from "../modules/accounts/services/LogoutUser/LogoutUserController";
import { ReadAllController } from "../modules/accounts/services/ReadAllUser/ReadAllController";
import { ReadUserController } from "../modules/accounts/services/ReadUser/ReadUserController";
import { UpdateUserController } from "../modules/accounts/services/UpdateUser/UpdateUserController";
import { UserLoginController } from "../modules/accounts/services/UserLogin/UserLoginController";
import { AddLibraryController } from "../modules/bookstore/services/AddLibrary/AddLibraryController";

import { authSecurity } from "./middlewares/authSecurity";

const router = Router();

//accounts ---------------------------------------------------------------------------
const createUserController = new CreateUserController();
router.post("/users/create", createUserController.control);

const userLoginController = new UserLoginController();
router.post("/users/login", userLoginController.control);

const updateUserController = new UpdateUserController();
router.put("/users/update", authSecurity, updateUserController.control);

const deleteUserController = new DeleteUserController();
router.delete("/users/delete", authSecurity, deleteUserController.control);

const readUserController = new ReadUserController();
router.get("/users/read", authSecurity, readUserController.control);

const logoutUserController = new LogoutUserController();
router.put("/users/logout", authSecurity, logoutUserController.control);

const addAdminController = new AddAdminController();
router.put("/users/addAdmin", authSecurity, addAdminController.control);

const readAllController = new ReadAllController();
router.get("/users/readAll", authSecurity, readAllController.control);
//-------------------------------------------------------------------------------------

//bookstore ---------------------------------------------------------------------------
const addLibraryController = new AddLibraryController();
router.post("/library/create", authSecurity, addLibraryController.control);



export { router };

