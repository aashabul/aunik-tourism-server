const express = require("express");
const cors = require("cors");
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());



const uri = "mongodb+srv://traveller1:QmU6B4T7jgV7yUyP@cluster0.gmdfr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("aunik-tourism");
        const offersCollection = database.collection("offers");
        const selectedOffersCollection = database.collection("selected_offers")
        const ordersCollection = database.collection("placed_orders");

        //get offers from server
        app.get('/offerings', async (req, res) => {
            const cursor = offersCollection.find({});
            const offers = await cursor.toArray();
            res.send(offers);
        });

        //post selected offers to server
        app.post('/selectedOffers', async (req, res) => {
            const selected = req.body;
            const selectedOffers = await selectedOffersCollection.insertOne(selected);
            console.log(selectedOffers);
            res.json(selectedOffers);
        })

        //get selected offers from server
        app.get('/selectedOffers', async (req, res) => {
            const findSelected = selectedOffersCollection.find({});
            const selectedResult = await findSelected.toArray();
            res.send(selectedResult);
        });

        //post orders to server
        app.post('/orders', async (req, res) => {
            const placeOrder = req.body;
            const orders = await ordersCollection.insertOne(placeOrder);
            console.log(orders);
            res.json(orders);
        })

        //get Myorders from the server
        app.get('/orders', async (req, res) => {
            const findOrders = ordersCollection.find({});
            const ordersResult = await findOrders.toArray();
            res.send(ordersResult);
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