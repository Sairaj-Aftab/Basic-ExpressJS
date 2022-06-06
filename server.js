const dotenv = require('dotenv').config()
const express = require('express');
const app = express();

// From dotenv information //
const PORT = process.env.PORT

// Request body init //
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

// Api routes //
app.use('/api/students', require('./routes/students.js'))


app.listen(PORT, () => console.log('Express server is running on port ' + PORT))