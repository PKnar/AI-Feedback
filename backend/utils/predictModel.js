import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function predictImage(imagePath) {
  return new Promise((resolve, reject) => {
    const pythonScript = path.join(__dirname, "../models/predict.py");
    const command = `python "${pythonScript}" "${imagePath}"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Error during model prediction:", error);
        return reject(error);
      }
      try {
        resolve(JSON.parse(stdout));
      } catch (err) {
        console.error("Error parsing JSON:", err);
        reject(err);
      }
    });
  });
}

export { predictImage };
