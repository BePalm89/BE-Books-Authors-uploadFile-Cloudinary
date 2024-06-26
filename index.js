require("dotenv").config();
const express = require('express');
const { connectDB } = require('./scr/config/db');
const cloudinary = require("cloudinary").v2;
const bookRoutes = require('./scr/api/routes/book.routes');
const authorsRoutes = require('./scr/api/routes/author.routes');

const server = express();
const PORT = 3000;
connectDB();

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
})

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use('/api/v1/books', bookRoutes);
server.use('/api/v1/authors', authorsRoutes)


server.use('*', (req, res, next) => {
	const error = new Error('Route not found'); 
	error.status = 404;
	next(error); 
});

server.use((error, req, res, next) => {
	return res.status(error.status || 500).json(error.message || 'Unexpected error');
}); 

server.listen(PORT, () => {
    console.log(`Server wroking on http://localhost:${PORT}`);
})