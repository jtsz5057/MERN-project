import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Define route for Saving a new book
router.post('/', async (request, response) => {
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

//define route for handling http GET request to the /books endpoint
router.get('/', async (request, response) => {
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
router.get('/:id', async (request, response) => {
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

//define route for updating a book with specific ID using the HTTP put request 
router.put('/:id', async (request, reponse) => {
    try {

        // Check if the required fields (title, author, publishYear) are provided in the request body
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            // If any required field is missing, send a 400 Bad Request response with an error message
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            })
        }

        // Extract the book ID from the request parameters
        const { id } = request.params;

        // Use Mongoose's findByIdAndUpdate to update the book with the specified ID with the data from the request body
        const result = await Book.findByIdAndUpdate(id, request.body);

        // If the book with the specified ID is not found, send a 404 Not Found response with an error message
        if (!result) {
            return response.status(404).json({ message: 'Book not found'});
        }

        // If the update is successful, send a 200 OK response with a success message
        return response.status(200).send({ message: 'Book updated successfully'})

    } catch (error) {
        // If any error occurs during the process, log the error message and send a 500 Internal Server Error response with an error message
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
});

//define route for deleting a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).send({ message: 'Book deleted successfully'})

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

export default router;