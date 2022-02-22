import { app } from "@routes/index.routes";
import { ServerLog } from "@helpers/WriteStartLog";

async function bootstrap() {
  try {
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
      console.log("Swagger API Docs running at /docs");
    });
  } catch (error: any) {
    ServerLog(error);
    console.log(error);
    console.log("There is an error on starting server, see logs for details");
    process.exit(0);
  }
}

bootstrap();
