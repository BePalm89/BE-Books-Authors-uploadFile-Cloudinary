const express = require('express');
const { getAllAuthors, getAuthorById, postAuthor, updateAuthor, deleteAuthor } = require('../controllers/author.controllers');
const upload = require('../../middleware/uploadFile');

const router = express.Router();

router.get('/', getAllAuthors);
router.get('/:id', getAuthorById);
router.post('/create',upload.single("profileImg"),  postAuthor);
router.put('/:id', upload.single("profileImg"), updateAuthor);
router.delete('/:id', deleteAuthor);

module.exports = router;