# AfterShift Sleep

A static sleep hypnosis web app focused on fast session start, low visual strain, and simple mobile playback.

## Local Use

Open `index.html` directly in a browser, or serve the folder with any static server.

## Agent Guides

- `AGENTS.md` is the working local guide.
- `AGENTS.public.md` is the GitHub-safe copy.

Keep them synchronized with:

```bash
npm run sync:agents
```

The local pre-commit hook in `.githooks/pre-commit` also runs this sync before every commit. Enable it once per checkout:

```bash
git config core.hooksPath .githooks
```
