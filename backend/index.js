import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js"
import booksRoute from "./routes/booksRoute.js"

const app = express()

// Middleware for parsing request body
app.use(express.json());

// http route
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to my jonathan page')
});

app.use('/books', booksRoute)

app.listen(PORT, () => {
    console.log(`App is listning to: ${PORT}`)
})


mongoose
    .connect(mongoDBURL)
    .then(()=> {
        console.log('App connected to database');
    })
    .catch((error) => {
        console.log(error);
    })