import mongoLoader from "./databaseLoader";
import serverLoader from "./serverLoader";
import socketLoader from "./socketLoader";

const mainLoader = async () => {
  const server = serverLoader();
  const mongoCollection = await mongoLoader();
  console.log("Mongo Loaded...");
  await socketLoader({ mongoCollection, server });
  console.log("Socket loaded...");
  return server;
};

export default mainLoader;
