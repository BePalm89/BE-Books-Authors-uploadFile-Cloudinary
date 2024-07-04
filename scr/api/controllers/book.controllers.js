const { deleteFile } = require('../../utils/deleteFile');
const Book = require('../models/Book.model');

const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        return res.status(200).json(books);
    } catch (error) {
        return next(error);
    }
}

const getBookById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const book = await Book.findById(id);

        if(!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json(book);

    } catch (error) {
        return next(error); 
    }
}

const getBooksByGenre = async ( req, res, next ) => {
    const { genre } = req.params;

    try {

        const books = await Book.find({ genre: genre });
        return res.status(200).json(books);

    } catch(error) {
        return next(error);
    }
}

const postBook = async (req, res, next ) => {
    try {
        const newBook = new Book(req.body);

        if(req.file) {
            newBook.bookCoverImg = req.file.path;
        }

        const bookSaved = await newBook.save();
        return res.status(201).json(bookSaved);

    } catch(error) {
        return next(error);
    }
}

const updateBook = async ( req, res, next ) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);
        if( book.bookCoverImg && req.file ) {
            deleteFile(book.bookCoverImg);
        }

        const modifiedBook = new Book(req.body);
        modifiedBook._id = id;

        if(req.file) {
            modifiedBook.bookCoverImg = req.file.path;
        }

        const updateBook = await Book.findByIdAndUpdate(id, modifiedBook, { new: true });
        return res.status(200).json(updateBook);

    } catch(error) {
        return next(error);
    }
} 

const deleteBook = async ( req, res, next ) => {
    const { id } = req.params;

    try {

        const deletedBook = await Book.findByIdAndDelete(id);
        deleteFile(deletedBook.bookCoverImg);
        return res.status(200).json("Book successfully deleted")

    } catch(error) {
        return next(error);
    }
}

module.exports = { getAllBooks, getBookById, getBooksByGenre, postBook, updateBook, deleteBook };