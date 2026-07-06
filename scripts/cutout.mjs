// One-off: remove the background from assets/headshot.jpeg, trim, and save
// to public/headshot-cutout.png for the hero.
import { removeBackground } from "@imgly/background-removal-node";
import sharp from "sharp";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const src = path.join(root, "assets", "headshot.jpeg");
const outDir = path.join(root, "public");
const out = path.join(outDir, "headshot-cutout.png");

const input = new Blob([await readFile(src)], { type: "image/jpeg" });
const result = await removeBackground(input, { output: { format: "image/png" } });
const buf = Buffer.from(await result.arrayBuffer());

await mkdir(outDir, { recursive: true });

// Trim transparent edges, keep grayscale, cap width at 1200px.
const trimmed = await sharp(buf)
  .trim()
  .grayscale()
  .resize({ width: 1200, withoutEnlargement: true })
  .png()
  .toBuffer();

await writeFile(out, trimmed);
const meta = await sharp(trimmed).metadata();
console.log(`wrote ${out} ${meta.width}x${meta.height}`);
