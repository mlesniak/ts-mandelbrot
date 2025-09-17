**TS Playground**

A small TypeScript + npm playground — just a space to hack on ideas and try things out. Nothing serious or production‑grade.

**Requirements**
- Node.js 18+ and `npm`

**Setup**
- Install deps: `npm install`

**Build**
- Compile TypeScript to `dist/`: `npm run build`

**Run (without linking)**
- Execute directly with tsx: `npm start`
- Or run the dev watcher: `npm run dev`

**Install CLI Locally (npm link)**
- Build once: `npm run build`
- Link globally: `npm link`
- Use the binary: `mandelbrot --help`
- Unlink when done: `npm unlink -g ts-playground && npm unlink`

**Notes**
- The CLI entrypoint is exposed as `mandelbrot` via the `bin` field and points to `dist/index.js`.
- `postbuild` marks `dist/index.js` as executable.

**License**
- Licensed under the Apache License, Version 2.0. See `LICENSE` for details.
