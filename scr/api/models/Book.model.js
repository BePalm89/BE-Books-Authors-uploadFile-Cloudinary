const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      enum: [
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
      ],
    },
    publicationYear: { type: Number, required: true },
    synopsis: { type: String },
    author: { type: mongoose.Types.ObjectId, ref: "Author"},
    ISBN: { type: Number, required: true },
    bookCoverImg: { type: String },
    numberOfPage: { type: Number },
  },
  { timestamps: true, collection: "books" }
);

const Book = mongoose.model("book", bookSchema, "books");

module.exports = Book;
