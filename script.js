require("dotenv").config();

const dbg = require("debug");
const mongoose = require("mongoose");

const dl = dbg("api:data");
const info = dbg("api:info");
const ul = dbg("api:undici");
const mon = dbg("api:mongoose");

const { fetch } = require("undici");
const { MongoClient } = require("mongodb");

// const dbName = "test";
// Connect using MongoClient
// const mongoClient = new MongoClient(process.env.MONGO_URI);

info( process.env.MONGO_URI );

// const client =

// async function run() {
//   try {
//     // Connect the client to the server
//     await client.connect();
//     // Establish and verify connection
//     await client.db("admin").command({ ping: 1 });
//     mon("Connected successfully to server");
//     // Get the documents collection
//     const db = client.db("testdb");
//     const collection = db.collection("documents");
//     // Insert some documents
//     const result = await collection.insertMany([
//       { a: 1 },
//       { a: 2 },
//       { a: 3 }
//     ]);
//     info("Inserted 3 documents into the collection");

//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// run();

// Run().catch(console.dir);
/*
const URLSTRING = "https://data.gov.sg/api/action/datastore_search";

const QUERY = "resource_id";

const MCST_RESOURCE_ID = "21b15082-ea01-40f8-ad2b-679f011d6764";
const HDB_RESOURCE_ID = "482bfa14-2977-4035-9c61-c85f871daf4e";
const FULL_DATASET = "85be5dcc-93f6-4d36-ae10-c85b0907948c";

const uri = new URL(URLSTRING);
uri.searchParams.set(QUERY, MCST_RESOURCE_ID);
// Uri.searchParams.set("offset", 1);
uri.searchParams.set("limit", 100);
// uri.searchParams.set("q", "1 canberra");

info(uri);
let holder;

const req = async () => {
  const response = await fetch(uri);
  info(response);
  const data = response.json();
  dl(data);
  holder = await data;
};

req().then(() => {
  dl(holder);
  // console.log(holder.result.fields);
  // Console.log(holder.result.records);
});
*/
