import fs from "node:fs";
import path from "node:path";
import https from "node:https";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "public", "images");

const files = [
  ["site/sound-story.jpg", "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=1200&q=80"],
  ["site/cta-studio.jpg", "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1200&q=80"],
  ["site/contact-studio.jpg", "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80"],
  ["beats/midnight-run.jpg", "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&q=80"],
  ["beats/neon-drift.jpg", "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80"],
  ["beats/signal-lost.jpg", "https://images.unsplash.com/photo-1494232410401-ad25d59fbbbc?w=800&q=80"],
  ["placements/placement-1.jpg", "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600&q=80"],
  ["placements/placement-2.jpg", "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80"],
  ["placements/placement-3.jpg", "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&q=80"],
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          file.close();
          fs.unlinkSync(dest);
          download(res.headers.location, dest).then(resolve).catch(reject);
          return;
        }
        res.pipe(file);
        file.on("finish", () => file.close(() => resolve()));
      })
      .on("error", (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
  });
}

for (const [rel, url] of files) {
  const dest = path.join(root, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  process.stdout.write(`Fetching ${rel}... `);
  await download(url, dest);
  console.log("ok");
}
