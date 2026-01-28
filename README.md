# robots-do-the-boring-stuff

A tiny **GitHub-native robot**: a Node.js script that runs in **GitHub Actions** and updates `STATUS.md` on a schedule.

## What you get

- ✅ Pure JavaScript (Node 20)
- ✅ Runs *directly on GitHub* via Actions (no server needed)
- ✅ Commits the generated output back into the repo

## Files

- `scripts/robot.mjs` — the robot (writes `STATUS.md`)
- `.github/workflows/robot.yml` — runs the robot on push / schedule / manual dispatch

## Run locally

```bash
npm run robot
# or preview without writing:
npm run format
```

## Run on GitHub

Go to **Actions → robots-do-the-boring-stuff → Run workflow**.

You can also wait for the daily scheduled run.

---

If you tell me what *boring task* you actually want automated (e.g., summarize issues weekly, auto-label PRs, sync Obsidian notes, fetch RSS), I’ll adapt the robot to do that.
