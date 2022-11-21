import { CreateLibraryController } from "@modules/bookstore/useCases/CreateLibrary/CreateLibraryController";
import { DeleteLibraryController } from "@modules/bookstore/useCases/DeleteLibrary/DeleteLibraryController";
import { ReadLibraryController } from "@modules/bookstore/useCases/ReadLibrary/ReadLibraryController";
import { UpdateLibraryController } from "@modules/bookstore/useCases/UpdateLibrary/UpdateLibraryController";
import { authSecurity } from "@shared/middlewares/authSecurity";
import { Router } from "express";

const booksStoreRoutes = Router();

const readLibraryController = new ReadLibraryController();
const createLibraryController = new CreateLibraryController();
const updateLibraryController = new UpdateLibraryController();
const deleteLibraryController = new DeleteLibraryController();

// Bookstore ---------------------------------------------------------------------------
booksStoreRoutes.post("/create", authSecurity, createLibraryController.control);

booksStoreRoutes.get("/read", authSecurity, readLibraryController.control);

booksStoreRoutes.put("/update", authSecurity, updateLibraryController.control);

booksStoreRoutes.delete(
  "/delete",
  authSecurity,
  deleteLibraryController.control
);
//-------------------------------------------------------------------------------------

export { booksStoreRoutes };
