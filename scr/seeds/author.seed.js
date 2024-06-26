const Author = require("../api/models/Author.model");
const mongoose = require("mongoose");

const AUTHORS = [
    {
        name: "Harper Lee",
        dateOfBirth: "1926-04-28",
        nationality: "American",
        biography: "Harper Lee was an American novelist best known for her 1960 novel 'To Kill a Mockingbird'. She received numerous awards, including the Pulitzer Prize for Fiction.",
        genre: "Fiction"
      },
      {
        name: "George Orwell",
        dateOfBirth: "1903-06-25",
        nationality: "British",
        biography: "George Orwell was an English novelist, essayist, journalist, and critic. He is best known for his dystopian novels '1984' and 'Animal Farm'.",
        genre: "Dystopian Fiction"
      },
      {
        name: "F. Scott Fitzgerald",
        dateOfBirth: "1896-09-24",
        nationality: "American",
        biography: "F. Scott Fitzgerald was an American novelist and short story writer, widely regarded as one of the greatest American writers of the 20th century. His most famous work is 'The Great Gatsby'.",
        genre: "Fiction"
      },
      {
        name: "Jane Austen",
        dateOfBirth: "1775-12-16",
        nationality: "British",
        biography: "Jane Austen was an English novelist known primarily for her six major novels, which interpret, critique, and comment upon the British landed gentry at the end of the 18th century. Her most notable works include 'Pride and Prejudice' and 'Sense and Sensibility'.",
        genre: "Classic Literature"
      },
      {
        name: "J.D. Salinger",
        dateOfBirth: "1919-01-01",
        nationality: "American",
        biography: "J.D. Salinger was an American writer known for his widely read novel, 'The Catcher in the Rye'. Following its success, Salinger led a very private life for more than a half-century.",
        genre: "Fiction"
      },
      {
        name: "J.K. Rowling",
        dateOfBirth: "1965-07-31",
        nationality: "British",
        biography: "J.K. Rowling is a British author, best known for writing the Harry Potter fantasy series. The books have gained worldwide attention, won multiple awards, and sold more than 500 million copies.",
        genre: "Fantasy"
      },
      {
        name: "J.R.R. Tolkien",
        dateOfBirth: "1892-01-03",
        nationality: "British",
        biography: "J.R.R. Tolkien was an English writer, poet, philologist, and academic. He is best known as the author of the classic high-fantasy works 'The Hobbit' and 'The Lord of the Rings'.",
        genre: "Fantasy"
      },
      {
        name: "C.S. Lewis",
        dateOfBirth: "1898-11-29",
        nationality: "British",
        biography: "C.S. Lewis was a British writer and lay theologian. He is best known for his works of fiction, especially 'The Chronicles of Narnia' series, and for his non-fiction Christian apologetics.",
        genre: "Fantasy"
      },
      {
        name: "Paulo Coelho",
        dateOfBirth: "1947-08-24",
        nationality: "Brazilian",
        biography: "Paulo Coelho is a Brazilian lyricist and novelist. He is best known for his novel 'The Alchemist'. His books have sold over 225 million copies worldwide and have been translated into 80 languages.",
        genre: "Fiction"
      }
];

const authorDocuments = AUTHORS.map((author) => new Author(author));

mongoose.connect(
    "mongodb+srv://bePalmBookAuthors:Op8EyCu9qVdlCO3B@cluster0.ajdwlmh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
.then(async() => {
    const allAuthors = await Author.find();

    if(allAuthors.length) {
        await Author.collection.drop();
    }
})
.catch((err) => console.log(`Error deleting data: ${err}`))
.then(async() => {
    await Author.insertMany(authorDocuments);
})
.catch((err) => console.log(`Error creating data: ${err}`))
.finally(() => mongoose.disconnect());