import { readFileSync } from "node:fs";

const localPath = "AGENTS.md";
const publicPath = "AGENTS.public.md";

const normalize = (value) => value.replace(/\r\n/g, "\n").trimEnd();
const localGuide = normalize(readFileSync(localPath, "utf8"));
const publicGuide = normalize(readFileSync(publicPath, "utf8"));

if (localGuide !== publicGuide) {
  console.error(`${localPath} and ${publicPath} are out of sync.`);
  console.error("Update both files together before committing.");
  process.exit(1);
}

console.log(`${localPath} and ${publicPath} are in sync.`);
