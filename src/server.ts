import "reflect-metadata";
import { app } from "@routes/index.routes";
import "./shared/container";
import { ServerLog } from "./helpers/WriteStartLog";

async function bootstrap() {
  try {
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
      console.log("Swagger API Docs running at /docs");
    });
  } catch (error: any) {
    ServerLog(error);
    process.exit(0);
  }
}

bootstrap();
