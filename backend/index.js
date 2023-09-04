const express = require('express');
const cors = require('cors');
const connectMongo = require("./db");
const bodyParser = require('body-parser');

connectMongo();

const app = express();
const port = process.env.PORT || 6969;

app.use(cors());
app.use(bodyParser.json());

// Test route
app.use('/test', (req,res)=>{
    res.status(200).send("This route is working")
})

//Routes
app.use('/auth', require("./routes/auth"))
app.use('/blog', require("./routes/blog"))


app.listen(port, ()=>{console.log(`QuillQuest backend running on http://localhost:${port}`)})

module.exports = app; 