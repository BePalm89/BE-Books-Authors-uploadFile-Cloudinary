const mongoose = require("mongoose");
const { collection } = require("./Book.model");

const authorSchema = new mongoose.Schema({
    name: { type: String, required: true},
    dateOfBirth : { type: String },
    nationality: { type: String, required: true },
    biography: { type: String },
    genre: { type: String, required: true, enum: [
        "Biography",
        "Classic Literature",
        "Dystopian Fiction",
        "Fantasy",
        "Fiction",
        "Historical Fiction",
        "Horror",
        "Mystery",
        "Romance",
        "Thriller",
    ]},
},
{ timeStamp: true, collection: "authors"});

const Author = mongoose.model("author", authorSchema, "authors");

module.exports = Author;