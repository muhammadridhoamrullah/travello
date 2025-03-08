import { MongoClient } from "mongodb";

const CONNECTION_STRING = process.env.MONGO_URI;

if (!CONNECTION_STRING) {
  throw new Error("There is no connection string");
}

let client: MongoClient;

export async function GetClientMongoInstance() {
  if (!client) {
    client = new MongoClient(CONNECTION_STRING!);
    await client.connect();
  }

  return client;
}

export async function GetDB() {
  const client = await GetClientMongoInstance();
  return client.db("travello");
}
