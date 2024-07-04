const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const getFolderName = (req) => {
  if (req.path.includes("authors")) {
    return "authors-api-rest-file";
  } else if (req.path.includes("books")) {
    return "books-api-rest-file/books";
  }
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: (req) => {
      getFolderName(req);
    },
    allowedFormats: ["jpg", "png", "jpeg", "gif"],
  },
});

const upload = multer({ storage });
module.exports = upload;
