# BE-Books-Authors-uploadFile-Cloudinary

In this BE project, I create an Express server, that is connected with MongoDB through mongoose. There are two different models, `Author`, `Book`. The two models are related to each other, due to a property called `Author` in the `Book` model.
The `Book` model has a property called `coverPageImg` to store an image in cloudinary, and the `Author` model has a property called `profileImg` to store an image in cloudinary as well.
I create a middleware to upload the file in cloudinary and a utility class called `deleteFile` in order to be able to delete the cover book image when a particular book is deleted from the DB. In addition, when update an author or a book, it is possible to replace the image in cloudinary, deleting the old image and uploading the new one.

### Acceptance criteria:

- [x] Server using Express
- [x] Connection to a Mongo Atlas database using Mongoose
- [x] Creation of two models, both with a field that allows storing a file
- [x] A seed script that uploads data to one of the collections
- [x] A relationship between collections
- [x] Complete CRUD operations for all collections
- [x] README.md with project documentation, indicating the endpoints and what each one does
- [x] File uploads to both collections using Cloudinary
- [x] Deletion of files in Cloudinary when the data is deleted in the database
- [x] Attempt to reuse Cloudinary storage by changing the folder (can be commented out)

### Author model:

```javascript
{
    name: { type: String, required: true},
    dateOfBirth : { type: String },
    nationality: { type: String, required: true },
    biography: { type: String },
    profileImg: { type: String },
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
{ timeStamp: true, collection: "authors"}
```

### Book model:

```javascript
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
```
### Middleware for upload file in cloudinary

```javascript
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "Books-Authors-api-rest-file",
        allowedFormats: ["jpg", "png", "jpeg", "gif"]
    }
});

const upload = multer({storage});
```

### Utility class to delete file from cloudinary

```javascript
const deleteFile = (imgUrl) => {
    
    const imgSplitted = imgUrl.split("/");
    const folderName = imgSplitted.at(-2);
    const fieldName = imgSplitted.at(-1).split(".");
  
    const public_id = `${folderName}/${fieldName[0]}`;

    cloudinary.uploader.destroy(public_id, () => {
        console.log("File deleted successfully!");
    })
}

```

### Author endpoints:

| Endpoint       | Method | Description                                   | Request body                      | Response                              |
|-----------------|--------|-----------------------------------------------|-----------------------------------|---------------------------------------|
| /authors        | GET    | Retrieves a list of all authors               |                                   | 200 OK with an array of authros       |
| /authors/:id    | GET    | Retrieves an author by their unique ID        |                                   | 200 OK with the author object         |
| /authors/create | POST   | Creates a new authors                         | Author object with necessary info | 201 OK with the new author            |
| /authors/:id    | PUT    | Updates an existing authors's info            | Author object with updated info   | 200 OK with the updated author object |
| /authors/:id    | DELETE | Deletes an existing author by their unique ID |                                   | 200 OK with a success message         |

### Book endpoints

| Endpoint            | Method | Description                            | Request body                    | Response                                           |
|---------------------|--------|----------------------------------------|---------------------------------|----------------------------------------------------|
| /books              | GET    | Retrives a list of all books           |                                 | 200 OK with an array of books                      |
| /books/:id          | GET    | Retrieves a book by their unique ID    |                                 | 200 OK with the book object                        |
| /books/genre/:genre | GET    | Retrieve a list of book by their genre |                                 | 200 OK with an array of books that match the genre |
| /books/create       | POST   | Creates a new book                     | Book object with necessary info | 201 OK with the new book                           |
| /books/:id          | PUT    | Updates an existing book's info        | Book object with updated info   | 200 OK with the updated book object                |
| /books/:id          | DELETE | Deletes an existing book               |                                 | 200 OK with a success message                      |