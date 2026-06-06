import { readFileSync } from "node:fs";

const guidePaths = ["AGENTS.md", "AGENTS.public.md"];

const patterns = [
  { name: "OpenAI-style API key", pattern: /\bsk-[A-Za-z0-9_-]{20,}\b/ },
  { name: "GitHub token", pattern: /\bgh[opsu]_[A-Za-z0-9_]{20,}\b/ },
  { name: "GitHub fine-grained token", pattern: /\bgithub_pat_[A-Za-z0-9_]+\b/ },
  { name: "Google API key", pattern: /\bAIza[0-9A-Za-z_-]{20,}\b/ },
  { name: "here.now environment assignment", pattern: /\bHERENOW_API_KEY\s*=\s*\S+/i },
  { name: "generic API key assignment", pattern: /\b[A-Z0-9_]*API_KEY\s*=\s*\S+/i },
  { name: "generic token assignment", pattern: /\b[A-Z0-9_]*TOKEN\s*=\s*\S+/i }
];

let hasFindings = false;

for (const path of guidePaths) {
  const content = readFileSync(path, "utf8");
  const findings = patterns.filter(({ pattern }) => pattern.test(content));

  if (findings.length > 0) {
    hasFindings = true;
    console.error(`${path} appears to contain secret-like values:`);
    for (const finding of findings) {
      console.error(`- ${finding.name}`);
    }
  }
}

if (hasFindings) {
  process.exit(1);
}

console.log(`${guidePaths.join(" and ")} have no obvious secret-like values.`);
