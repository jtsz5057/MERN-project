import express from "express";
import { PORT } from "./config.js"

const app = express()

//http route
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to my jonathan page')
});

app.listen(PORT, () => {
    console.log(`App is listning to: ${PORT}`)
})