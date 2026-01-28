#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";

const argv = new Set(process.argv.slice(2));
const dryRun = argv.has("--dry-run");

const root = process.cwd();
const readmePath = path.join(root, "README.md");

const now = new Date();
const iso = now.toISOString();

const quips = [
  "I checked the boxes so you don't have to.",
  "Another day, another automation.",
  "Boring tasks completed with suspicious enthusiasm.",
  "Your future self says thanks.",
  "I ran the checklist. No applause needed.",
  "I turned doomscrolling into a cron job.",
];
const quip = quips[Math.floor(Math.random() * quips.length)];

const HN_TOP_STORIES_URL = "https://hacker-news.firebaseio.com/v0/topstories.json";
const HN_ITEM_URL = (id) => `https://hacker-news.firebaseio.com/v0/item/${id}.json`;
const HN_DISCUSS_URL = (id) => `https://news.ycombinator.com/item?id=${id}`;

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: {
      "user-agent": "robots-do-the-boring-stuff (github actions)"
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${url}`);
  }
  return res.json();
}

async function getTopHN(n = 3) {
  const ids = await fetchJson(HN_TOP_STORIES_URL);
  const top = ids.slice(0, n);
  const items = await Promise.all(top.map((id) => fetchJson(HN_ITEM_URL(id))));
  return items.map((it) => ({
    id: it.id,
    title: it.title ?? "(no title)",
    url: it.url ?? HN_DISCUSS_URL(it.id),
    by: it.by ?? "unknown",
    score: it.score ?? 0,
    comments: it.descendants ?? 0,
  }));
}

let hn = [];
let hnError = null;
try {
  hn = await getTopHN(3);
} catch (err) {
  hnError = err instanceof Error ? err.message : String(err);
}

const hnBlock = hnError
  ? `⚠️ Failed to fetch Hacker News top stories: ${hnError}`
  : hn
      .map(
        (s, i) =>
          `${i + 1}. [${s.title}](${s.url})  \
   score: ${s.score} • comments: ${s.comments} • by: ${s.by} • [discussion](${HN_DISCUSS_URL(s.id)})`
      )
      .join("\n\n");

const START = "<!-- HN:START -->";
const END = "<!-- HN:END -->";

const block = `${START}

## Top 3 on Hacker News

_Last update: ${iso}_

> ${quip}

${hnBlock}

${END}`;

function replaceBetweenMarkers(text) {
  const startIdx = text.indexOf(START);
  const endIdx = text.indexOf(END);

  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    throw new Error(
      `README is missing markers. Please include:\n${START}\n${END}`
    );
  }

  return text.slice(0, startIdx) + block + text.slice(endIdx + END.length);
}

if (dryRun) {
  const existing = await fs.readFile(readmePath, "utf8");
  console.log(replaceBetweenMarkers(existing));
  process.exit(0);
}

const readme = await fs.readFile(readmePath, "utf8");
const updated = replaceBetweenMarkers(readme);
await fs.writeFile(readmePath, updated, "utf8");
console.log(`Updated ${readmePath}`);
