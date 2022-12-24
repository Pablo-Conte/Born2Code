import { Router } from "express";

import { billsRoutes } from "./routes/bills.routes";
import { booksRoutes } from "./routes/books.routes";
import { booksStoreRoutes } from "./routes/bookstore.routes";
import { emphasisBookRouter } from "./routes/emphasisBook.routes";
import { userRoutes } from "./routes/user.routes";

const routesIndex = Router();

routesIndex.use("/users", userRoutes);
routesIndex.use("/books", booksRoutes);
routesIndex.use("/libraries", booksStoreRoutes);
routesIndex.use("/emphasisBooks", emphasisBookRouter);
routesIndex.use("/bills", billsRoutes);

export { routesIndex };
