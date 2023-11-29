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

//define route for handling http GET request to the /books endpoint
app.get('/books', async (request, response) => {
    try {   
        // retrieve all books from database using the book model 
        const books = await Book.find({});
        
        // if the database query is successful, respond with a JSON Object containing the book data
        return response.status(200).json({
            count: books.length, //show number of books retrieved 
            data: books // array of books object 
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//define route for handling http GET request to each books by id
app.get('/books/:id', async (request, response) => {
    try {   

        // retrieve book id from the request parameters
        const { id } = request.params;
        // retrieve information about book with speified ID from the database using book model 
        const book = await Book.findById(id);
        
        // if the database query is successful, respond with a JSON Object containing the book data
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});



mongoose
    .connect(mongoDBURL)
    .then(()=> {
        console.log('App connected to database');
    })
    .catch((error) => {
        console.log(error);
    })