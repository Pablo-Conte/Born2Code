import { app } from "./app";

const port = process.env.PORT || 1234;

app.listen(port, () => console.log(`Server is running on -> ${
    process.env.API_ENV == 'dev'
    ? process.env.DEV_API_URL
    : process.env.PROD_API_URL
}`));