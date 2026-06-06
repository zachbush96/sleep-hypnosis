import { copyFileSync, existsSync, statSync } from "node:fs";

const localPath = "AGENTS.md";
const publicPath = "AGENTS.public.md";

const paths = [localPath, publicPath];
const secretPatterns = [
  { name: "OpenAI-style API key", pattern: /\bsk-[A-Za-z0-9_-]{20,}\b/ },
  { name: "GitHub token", pattern: /\bgh[opsu]_[A-Za-z0-9_]{20,}\b/ },
  { name: "GitHub fine-grained token", pattern: /\bgithub_pat_[A-Za-z0-9_]+\b/ },
  { name: "Google API key", pattern: /\bAIza[0-9A-Za-z_-]{20,}\b/ },
  { name: "here.now environment assignment", pattern: /\bHERENOW_API_KEY\s*=\s*\S+/i },
  { name: "generic API key assignment", pattern: /\b[A-Z0-9_]*API_KEY\s*=\s*\S+/i },
  { name: "generic token assignment", pattern: /\b[A-Z0-9_]*TOKEN\s*=\s*\S+/i }
];

for (const path of paths) {
  if (!existsSync(path)) {
    continue;
  }

  const content = await import("node:fs").then(({ readFileSync }) => readFileSync(path, "utf8"));
  const findings = secretPatterns.filter(({ pattern }) => pattern.test(content));

  if (findings.length > 0) {
    console.error(`${path} appears to contain secret-like values:`);
    for (const finding of findings) {
      console.error(`- ${finding.name}`);
    }
    process.exit(1);
  }
}

if (!existsSync(localPath) && !existsSync(publicPath)) {
  console.error(`Neither ${localPath} nor ${publicPath} exists.`);
  process.exit(1);
}

if (!existsSync(publicPath)) {
  copyFileSync(localPath, publicPath);
  console.log(`Created ${publicPath} from ${localPath}.`);
  process.exit(0);
}

if (!existsSync(localPath)) {
  copyFileSync(publicPath, localPath);
  console.log(`Created ${localPath} from ${publicPath}.`);
  process.exit(0);
}

const localMtime = statSync(localPath).mtimeMs;
const publicMtime = statSync(publicPath).mtimeMs;

if (localMtime > publicMtime) {
  copyFileSync(localPath, publicPath);
  console.log(`Synced ${publicPath} from ${localPath}.`);
} else if (publicMtime > localMtime) {
  copyFileSync(publicPath, localPath);
  console.log(`Synced ${localPath} from ${publicPath}.`);
} else {
  console.log(`${localPath} and ${publicPath} have matching timestamps; no sync performed.`);
}
