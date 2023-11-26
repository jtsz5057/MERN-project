import express from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose";

const app = express()

//http route
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to my jonathan page')
});

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