# robots-do-the-boring-stuff

A tiny **GitHub-native robot**: a Node.js script that runs in **GitHub Actions** and pins the **top 3 items on Hacker News** into this README.

<!-- HN:START -->

## Top 3 on Hacker News

_Last update: 2026-01-28T16:00:30.825Z_

> Boring tasks completed with suspicious enthusiasm.

1. [Microsoft forced me to switch to Linux](https://www.himthe.dev/blog/microsoft-to-linux)     score: 282 • comments: 221 • by: bobsterlobster • [discussion](https://news.ycombinator.com/item?id=46795864)

2. [Airfoil (2024)](https://ciechanow.ski/airfoil/)     score: 127 • comments: 17 • by: brk • [discussion](https://news.ycombinator.com/item?id=46795908)

3. [Dole Kemp 96 Web Site](https://www.dolekemp96.org/main.htm)     score: 34 • comments: 22 • by: DamnInteresting • [discussion](https://news.ycombinator.com/item?id=46796571)

<!-- HN:END -->

## What you get

- ✅ Pure JavaScript (Node 20)
- ✅ Runs *directly on GitHub* via Actions (no server needed)
- ✅ Fetches data from the official Hacker News Firebase API
- ✅ Commits the generated output back into the repo

## Files

- `scripts/robot.mjs` — fetches HN top stories and updates the README block
- `.github/workflows/robot.yml` — runs the robot on push / schedule / manual dispatch

## Run locally

```bash
npm run robot
# preview without writing:
npm run format
```

## Run on GitHub

Go to **Actions → robots-do-the-boring-stuff → Run workflow**.

Or wait for the daily scheduled run.
