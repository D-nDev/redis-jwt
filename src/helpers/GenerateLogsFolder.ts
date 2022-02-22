import path from "path";
import fs from "fs";

export function generate() {
  if (!fs.existsSync(path.join(__dirname, "../logs/Requests.log"))) {
    fs.mkdirSync(path.join(__dirname, "../logs"), {
      recursive: true,
    });
    fs.writeFileSync(path.join(__dirname, "../logs/Requests.log"), "");
  }
}
