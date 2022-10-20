import { MongoClient } from "mongodb";

const mongoLoader = async () => {
  try {
    const mongoClient = new MongoClient(process.env.MONGO_URL);
    await mongoClient.connect();

    const db = mongoClient.db("shatzen");
    const collection = db.collection("socket.io-adapter-events");

    return collection;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default mongoLoader;
