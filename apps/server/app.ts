import "dotenv/config";
import mainLoader from "./loaders";

const PORT = process.env.PORT || 3001;

const main = async () => {
  const server = await mainLoader();

  server
    .listen(PORT, () => console.log("Server running on Port ", PORT))
    .on("error", (err) => console.log(err));
};

main();
