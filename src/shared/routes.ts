import { Router } from "express";
import { AddAdminController } from "../modules/accounts/services/AddAdmin/AddAdminController";
import { CreateUserController } from "../modules/accounts/services/CreateUser/CreateUserController";
import { DeleteUserController } from "../modules/accounts/services/DeleteUser/DeleteUserController";
import { LogoutUserController } from "../modules/accounts/services/LogoutUser/LogoutUserController";
import { ReadAllController } from "../modules/accounts/services/ReadAllUser/ReadAllController";
import { ReadUserController } from "../modules/accounts/services/ReadUser/ReadUserController";
import { UpdateUserController } from "../modules/accounts/services/UpdateUser/UpdateUserController";
import { UserLoginController } from "../modules/accounts/services/UserLogin/UserLoginController";
import { CreateBookController } from "../modules/books/services/CreateBook/CreateBookController";
import { DeleteBookController } from "../modules/books/services/DeleteBook/DeleteBookController";
import { ReadBookController } from "../modules/books/services/ReadBook/ReadBookController";
import { UpdateBookController } from "../modules/books/services/UpdateBook/UpdateBookController";
import { CreateLibraryController } from "../modules/bookstore/services/CreateLibrary/CreateLibraryController";
import { DeleteLibraryController } from "../modules/bookstore/services/DeleteLibrary/DeleteLibraryController";
import { ReadLibraryController } from "../modules/bookstore/services/ReadLibrary/ReadLibraryController";
import { UpdateLibraryController } from "../modules/bookstore/services/UpdateLibrary/UpdateLibraryController";


import { authSecurity } from "./middlewares/authSecurity";

const router = Router();

//accounts ---------------------------------------------------------------------------
const createUserController = new CreateUserController();
router.post("/users/create", createUserController.control);

const readUserController = new ReadUserController();
router.get("/users/read", authSecurity, readUserController.control);

const updateUserController = new UpdateUserController();
router.put("/users/update", authSecurity, updateUserController.control);

const deleteUserController = new DeleteUserController();
router.delete("/users/delete", authSecurity, deleteUserController.control);

const userLoginController = new UserLoginController();
router.post("/users/login", userLoginController.control);

const logoutUserController = new LogoutUserController();
router.put("/users/logout", authSecurity, logoutUserController.control);

const addAdminController = new AddAdminController();
router.put("/users/addAdmin", authSecurity, addAdminController.control);

const readAllController = new ReadAllController();
router.get("/users/readAll", authSecurity, readAllController.control);
//-------------------------------------------------------------------------------------

//Bookstore ---------------------------------------------------------------------------
const createLibraryController = new CreateLibraryController();
router.post("/library/create", authSecurity, createLibraryController.control);

const readLibraryController = new ReadLibraryController();
router.get("/library/read", authSecurity, readLibraryController.control)

const updateLibraryController = new UpdateLibraryController();
router.put("/library/update", authSecurity, updateLibraryController.control);

const deleteLibraryController = new DeleteLibraryController();
router.delete("/library/delete", authSecurity, deleteLibraryController.control);
//-------------------------------------------------------------------------------------

//Books -------------------------------------------------------------------------------
const createBookController = new CreateBookController();
router.post("/books/create", authSecurity, createBookController.control);

const readBookController = new ReadBookController();
router.get("/books/read", authSecurity, readBookController.control);

const updateBookController = new UpdateBookController();
router.put("/books/update", authSecurity, updateBookController.control);

const deleteBookController = new DeleteBookController();
router.delete("/books/delete", authSecurity, deleteBookController.control);



export { router };

