const express = require('express');

const connectDB = require('./Config/connection.js');

const app = express();


 // connectDB
connectDB();

//Middleware
app.use(express.json()) ;
app.use('/api/contacts', require('./Routes/contact.js'))

const port = 5000;

app.listen(port, () => console.log(`server run on server ${port}`))

