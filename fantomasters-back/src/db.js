import { MongoClient } from 'mongodb';

let db;

async function connectToDb(cb) {
  const client = new MongoClient(`mongodb+srv://node-express-server:hS67zJe9m34gzzMo@cluster0.2m5w2ni.mongodb.net/?retryWrites=true&w=majority`);
  await client.connect();
  db = client.db('phantomasters-db');
  cb();
}

export {
  db,
  connectToDb,
}