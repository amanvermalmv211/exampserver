import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import {Book} from './models/mysch.js';
import cors from 'cors';

const app = express();
app.use(cors());
dotenv.config();

app.use(express.json());

app.get('/', (req, res)=>{
    return res.status(234).send("Welcome to mern stact");
})

app.post('/books', async (req, res)=>{
    try{
        if(
            !req.body.title || !req.body.author || !req.body.publishYear
        ){
            return res.status(400).send({
                message: 'send all request fields : title, author, publishYear'
            });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        // const book = await Book.create(newBook);
        const book = await Book.create(newBook);

        return res.status(200).send(book);

    }
    catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

app.get('/books', async(req, res)=>{
    try{
        const books = await Book.find({});

        return res.status(200).json(books);
    }catch(err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
})

mongoose.connect(process.env.DB_URI)
.then(()=>{
    console.log("Connected successfully");
    app.listen(process.env.PORT, ()=>{
        console.log(`App is listenging to port: ${process.env.PORT}`);
    });
})
.catch((error)=>{
    console.log(error);
});