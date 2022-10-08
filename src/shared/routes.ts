import { Router } from "express";
import { AddAdminController } from "../modules/accounts/controllers/AddAdminController";
import { CreateUserController } from "../modules/accounts/controllers/CreateUserController";
import { DeleteUserController } from "../modules/accounts/controllers/DeleteUserController";
import { LogoutUserController } from "../modules/accounts/controllers/LogoutUserController";
import { ReadAllController } from "../modules/accounts/controllers/ReadAllController";
import { ReadUserController } from "../modules/accounts/controllers/ReadUserController";
import { UpdateUserController } from "../modules/accounts/controllers/UpdateUserController";
import { UserLoginController } from "../modules/accounts/controllers/UserLoginController";
import { AddLibraryController } from "../modules/bookstore/controllers/AddLibraryController";
import { authSecurity } from "./middlewares/authSecurity";

const router = Router();

//accounts ---------------------------------------------------------------------------
const createUserController = new CreateUserController();
const userLoginController = new UserLoginController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const readUserController = new ReadUserController();
const logoutUserController = new LogoutUserController();
const addAdminController = new AddAdminController();
const readAllController = new ReadAllController();

router.post("/users/create", createUserController.control);
router.put("/users/update", authSecurity, updateUserController.control);
router.delete("/users/delete", authSecurity, deleteUserController.control);
router.post("/users/login", userLoginController.control);
router.get("/users/read", authSecurity, readUserController.control);
router.get("/users/readAll", authSecurity, readAllController.control);
router.put("/users/logout", authSecurity, logoutUserController.control);
router.put("/users/addAdmin", authSecurity, addAdminController.control);
//-------------------------------------------------------------------------------------

//bookstore ---------------------------------------------------------------------------
const addLibraryController = new AddLibraryController();

router.post("/library/create", addLibraryController.control);



export { router };

