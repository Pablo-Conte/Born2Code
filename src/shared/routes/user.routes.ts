import { Router } from "express";
import multer from "multer";
import upload from "src/config/upload";
import { authSecurity } from "@shared/middlewares/authSecurity";
import { CreateUserController } from "@modules/accounts/useCases/CreateUser/CreateUserController";
import { DeleteUserController } from "@modules/accounts/useCases/DeleteUser/DeleteUserController";
import { ReadAllController } from "@modules/accounts/useCases/ReadAllUser/ReadAllController";
import { ReadUserController } from "@modules/accounts/useCases/ReadUser/ReadUserController";
import { ToggleAdminController } from "@modules/accounts/useCases/ToggleAdmin/ToggleAdminController";
import { UpdateUserController } from "@modules/accounts/useCases/UpdateUser/UpdateUserController";
import { UploadAvatarController } from "@modules/accounts/useCases/UploadImage/UploadAvatarController";

const readAllController = new ReadAllController();
const readUserController = new ReadUserController();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const toggleAdminController = new ToggleAdminController();
const uploadAvatarController = new UploadAvatarController();

const userRoutes = Router();
const uploadImage = multer(upload.upload("./tmp/avatar"));

userRoutes.post("/create", createUserController.control);
userRoutes.get("/read", authSecurity, readUserController.control);
userRoutes.get("/readAll", authSecurity, readAllController.control);
userRoutes.put("/update", authSecurity, updateUserController.control);
userRoutes.put("/toggleAdmin", authSecurity, toggleAdminController.control);
userRoutes.delete("/delete", authSecurity, deleteUserController.control);
userRoutes.patch(
  "/avatar",
  authSecurity,
  uploadImage.single("avatar"),
  uploadAvatarController.control
);

export { userRoutes };
