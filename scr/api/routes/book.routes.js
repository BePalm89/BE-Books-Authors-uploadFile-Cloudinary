const express = require('express');
const { getAllBooks, getBookById, getBooksByGenre, postBook, updateBook, deleteBook } = require('../controllers/book.controllers');
const upload = require('../../middleware/uploadFile');

const router = express.Router();

router.get('/', getAllBooks);
router.get('/:id', getBookById)
router.get('/genre/:genre', getBooksByGenre);
router.post('/create', upload.single("bookCoverImg"), postBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook)

module.exports = router;