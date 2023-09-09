const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

const connectMongo = async () => {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to Mongo")
}

module.exports = connectMongo;