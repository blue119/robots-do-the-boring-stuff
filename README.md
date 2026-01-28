# robots-do-the-boring-stuff

A tiny **GitHub-native robot**: a Node.js script that runs in **GitHub Actions** and updates `STATUS.md` with the **top 3 items on Hacker News**.

## What you get

- ✅ Pure JavaScript (Node 20)
- ✅ Runs *directly on GitHub* via Actions (no server needed)
- ✅ Fetches data from the official Hacker News Firebase API
- ✅ Commits the generated output back into the repo

## Files

- `scripts/robot.mjs` — fetches HN top stories and writes `STATUS.md`
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
