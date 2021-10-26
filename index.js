const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bdilp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
   try{
      await client.connect();
      //console.log("database connected!");
      const database = client.db('volunteer_network');
      const eventsCollection = database.collection('events');

      //get events api
      app.get('/events', async(req,res)=>{
          const cursor = eventsCollection.find({});
          const events = await cursor.toArray();

          res.send({events});
      });
   }
   finally{
       //await client.close();
   }
}

run().catch(console.dir);

app.get('/', (req,res)=>{
    res.send("server running!");
});

app.listen(port, ()=>{
    console.log('Running server port : ', port);
})