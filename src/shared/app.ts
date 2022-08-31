import "dotenv/config";
import "express-async-errors"
import cors from "cors"; //Permite a comunicação entre o back e o front
import express, { NextFunction, Request, Response } from "express";
import { router } from "./routes";
import { AppError } from "./errors";

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true })) //isso vai passar por um middleware do próprio express onde vai comparar se os tipos que estão sendo passados são os mesmos tipos que queremos usar na aplicação.
app.use(cors());
app.use(router);

app.use((err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if(err instanceof AppError){
        return response.status(err.statusCode).json({
            message: err.message
        })
    }
    return response.status(500).json({
        status: "Error",
        message: `Internal Server Error, error: ${err}`
    });
});

export { app }; 

