import resizeImg from "resize-img";
import http from "http";
import https from "https";
import { createWriteStream, readFileSync, writeFile } from "fs";
import path from "path";

export async function resizeImage(req, res) {
  const { url } = req.body;

  if (!url.startsWith("http")) {
    res.status(400).json({ message: "Please enter a valid url string" });
    return;
  }

  try {
    const filePath = "./img/sample.jpg";
    const resizedFilePath = "./img/imageResized.jpg";
    await downloadFile(url, filePath);

    const options = { width: 50, height: 50 };
    const newImage = await resizeImg(readFileSync(filePath), options);

    writeFile(resizedFilePath, newImage, (err) => {
      if (err) throw err;
      res.status(200).sendFile(path.resolve(resizedFilePath));
    });
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "An Error Occured while trying to process your request",
    });
  }
}

function downloadFile(url, filePath) {
  const pkg = url.toLowerCase().startsWith("https") ? https : http;
  return new Promise((resolve, reject) => {
    pkg
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
          return;
        }
        const file = createWriteStream(filePath);

        file.on("finish", () => resolve(file));
        file.on("error", (error) => reject(error));

        response.pipe(file);
      })
      .on("error", (error) => reject(error));
  });
}
