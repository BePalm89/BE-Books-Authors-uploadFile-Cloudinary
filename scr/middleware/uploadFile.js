const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

/* const getFolderName = (req) => {
    if (req.path.includes('authors')) {
        return 'Books-Authors-api-rest-file/authors';
    } else if (req.path.includes('books')) {
        return 'Books-Authors-api-rest-file/books';
    }
    return 'Books-Authors-api-rest-file/others'; // Default folder
}; */

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Books-Authors-api-rest-file",
  /*       folder: (req) => {
            getFolderName(req);
        },      */
        allowedFormats: ["jpg", "png", "jpeg", "gif"]
    }
});

const upload = multer({storage});
module.exports = upload;