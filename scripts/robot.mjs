#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";

const argv = new Set(process.argv.slice(2));
const dryRun = argv.has("--dry-run");

const root = process.cwd();
const statusPath = path.join(root, "STATUS.md");

const now = new Date();
const iso = now.toISOString();

const quips = [
  "I checked the boxes so you don't have to.",
  "Another day, another automation.",
  "Boring tasks completed with suspicious enthusiasm.",
  "Your future self says thanks.",
  "I ran the checklist. No applause needed.",
];
const quip = quips[Math.floor(Math.random() * quips.length)];

const content = `# 🤖 robots-do-the-boring-stuff\n\nLast run: **${iso}**\n\n> ${quip}\n\n## What this repo does\n\n- Demonstrates a **GitHub Actions** workflow that runs a small Node.js script\n- Updates this file on a schedule (and on manual dispatch)\n\n## Next ideas\n\n- Auto-triage issues/PRs\n- Nightly dependency updates\n- Generate a weekly project digest\n`;

if (dryRun) {
  console.log(content);
  process.exit(0);
}

await fs.writeFile(statusPath, content, "utf8");
console.log(`Wrote ${statusPath}`);
