import { PORT } from "./config";
import app from "./app";
import { AppDataSource } from "./config/dataSource";

async function main() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error while starting the server:", error);
  }
}

main();
