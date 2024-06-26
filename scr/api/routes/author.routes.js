const express = require('express');
const { getAllAuthors, getAuthorById, postAuthor, updateAuthor, deleteAuthor } = require('../controllers/author.controllers');

const router = express.Router();

router.get('/', getAllAuthors);
router.get('/:id', getAuthorById);
router.post('/create', postAuthor);
router.put('/:id', updateAuthor);
router.delete('/:id', deleteAuthor);

module.exports = router;