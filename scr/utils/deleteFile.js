const cloudinary = require("cloudinary").v2;

const deleteFile = (imgUrl) => {
    console.log(imgUrl);
    const imgSplitted = imgUrl.split("/");
    const folderName = imgSplitted.at(-2);
    const fieldName = imgSplitted.at(-1).split(".");
  
    const public_id = `${folderName}/${fieldName[0]}`;

    cloudinary.uploader.destroy(public_id, () => {
        console.log("File deleted successfully!");
    })
}

module.exports = { deleteFile };