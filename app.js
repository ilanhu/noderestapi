const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
if (process.env.ENV === 'Test') {
	console.log('This is a test!');
	const db = mongoose.connect('mongodb://localhost/bookAPI_test');
} else {
	console.log('This is for real!');
	const db = mongoose.connect('mongodb://localhost/bookAPI-prod');
}
const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

const port = process.env.port || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
	res.send('Welcome to my nodemon API!');
});

app.server = app.listen(port, () => {
	console.log(`Running on port: ${port}`);
});

module.exports = app;
