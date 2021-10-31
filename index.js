const express = require("express");
const cors = require("cors");
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

// user: traveller1
//password: QmU6B4T7jgV7yUyP

app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://traveller1:QmU6B4T7jgV7yUyP@cluster0.gmdfr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("aunik-tourism");
        const haiku = database.collection("offers");


        //post api
        app.post('/offerings', async (req, res) => {

            haiku.insertOne(req.body).then((result) => {
                res.send(result.insertedId);
            })

        });
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(port, () => {
    console.log("Running server on port", port);
})