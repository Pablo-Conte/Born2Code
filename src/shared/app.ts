import "dotenv/config";
import cors from "cors"; //Permite a comunicação entre o back e o front
import express from "express";

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true })) //isso vai passar por um middleware do próprio express onde vai comparar se os tipos que estão sendo passados são os mesmos tipos que queremos usar na aplicação.
app.use(cors());

export { app }; 

