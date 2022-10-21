import { Router } from "express";

import { AddBookToLibraryController } from "../../modules/books/useCases/AddBookToLibrary/AddBookToLibraryController";
import { CreateBookController } from "../../modules/books/useCases/CreateBook/CreateBookController";
import { DeleteBookController } from "../../modules/books/useCases/DeleteBook/DeleteBookController";
import { ReadBooksController } from "../../modules/books/useCases/ReadBooks/ReadAllBooksController";
import { RentABookController } from "../../modules/books/useCases/RentABook/RentABookController";
import { ReturnBookController } from "../../modules/books/useCases/ReturnBook/ReturnBookController";
import { UpdateBookController } from "../../modules/books/useCases/UpdateBook/UpdateBookController";
import { authSecurity } from "../middlewares/authSecurity";

const booksRoutes = Router();

const createBookController = new CreateBookController();
const readBooksController = new ReadBooksController();
const updateBookController = new UpdateBookController();
const deleteBookController = new DeleteBookController();
const addBookToLibrary = new AddBookToLibraryController();
const rentABookController = new RentABookController();
const returnBookController = new ReturnBookController();

// Books -------------------------------------------------------------------------------
booksRoutes.post("/create", authSecurity, createBookController.control);

booksRoutes.get("/read", authSecurity, readBooksController.control);

booksRoutes.put("/update", authSecurity, updateBookController.control);

booksRoutes.delete("/delete", authSecurity, deleteBookController.control);

booksRoutes.post("/addBookToLibrary", authSecurity, addBookToLibrary.control);

booksRoutes.post("/return", authSecurity, returnBookController.control);

booksRoutes.put("/rent", authSecurity, rentABookController.control);

export { booksRoutes };
