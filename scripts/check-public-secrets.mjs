import { readFileSync } from "node:fs";

const publicPath = "AGENTS.public.md";
const content = readFileSync(publicPath, "utf8");

const patterns = [
  { name: "OpenAI-style API key", pattern: /\bsk-[A-Za-z0-9_-]{20,}\b/ },
  { name: "GitHub token", pattern: /\bgh[opsu]_[A-Za-z0-9_]{20,}\b/ },
  { name: "here.now environment assignment", pattern: /\bHERENOW_API_KEY\s*=\s*\S+/i },
  { name: "generic API key assignment", pattern: /\b[A-Z0-9_]*API_KEY\s*=\s*\S+/i },
  { name: "generic token assignment", pattern: /\b[A-Z0-9_]*TOKEN\s*=\s*\S+/i }
];

const findings = patterns.filter(({ pattern }) => pattern.test(content));

if (findings.length > 0) {
  console.error(`${publicPath} appears to contain secret-like values:`);
  for (const finding of findings) {
    console.error(`- ${finding.name}`);
  }
  process.exit(1);
}

console.log(`${publicPath} has no obvious secret-like values.`);
