const Author = require("../models/Author.model");
const { deleteFile } = require("../../utils/deleteFile");
const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find();
    return res.status(200).json(authors);
  } catch (error) {
    return next(error);
  }
};

const getAuthorById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const author = await Author.findById(id);

    if (!author) {
      return res.status(404).json({ message: "Author not found" });
    }

    return res.status(200).json(author);
  } catch (error) {
    return next(error);
  }
};

const postAuthor = async (req, res, next) => {
  try {
    const newAuthor = new Author(req.body);

    if (req.file) {
      newAuthor.profileImg = req.file.path;
    }

    const authorSaved = await newAuthor.save();
    return res.status(201).json(authorSaved);
  } catch (error) {
    return next(error);
  }
};

const updateAuthor = async (req, res, next) => {
  const { id } = req.params;

  try {
    const author = await Author.findById(id);

    if (author.profileImg && req.file) {
      deleteFile(author.profileImg);
    }

    const modifiedAuthor = new Author(req.body);
    modifiedAuthor._id = id;

    if (req.file) {
      modifiedAuthor.profileImg = req.file.path;
    }

    const updateAuthor = await Author.findByIdAndUpdate(id, modifiedAuthor, {
      new: true,
    });

    return res.status(200).json(updateAuthor);
  } catch (error) {
    return next(error);
  }
};

const deleteAuthor = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedAuthor = await Author.findByIdAndDelete(id);
    deleteFile(deletedAuthor.profileImg);
    return res.status(200).json("Author successfully deleted!");
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAllAuthors,
  getAuthorById,
  postAuthor,
  updateAuthor,
  deleteAuthor,
};
