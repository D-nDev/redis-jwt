import fs from "fs";
import path from "path";

export function ServerLog(error: any) {
  fs.appendFile(
    path.join(__dirname, `../logs/Server.log`),
    `${error}; Date: ${new Date().toLocaleDateString("en-us")}\n\n`,
    () => {}
  );
}
