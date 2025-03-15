require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const emailRoutes = require('./routes/emailRoutes.js');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/email', emailRoutes);

app.listen(PORT, () => {
    console.log(`Server Running on Port: ${PORT}`)
})
