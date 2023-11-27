import express, { request } from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js"

const app = express()

// http route
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to my jonathan page')
});

// Route for Save a new book
app.post('/books', async (requets, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message:error.message })
    }
})


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