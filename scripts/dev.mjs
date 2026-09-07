import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const nextBin = require.resolve("next/dist/bin/next");
const incoming = process.argv.slice(2);
const forwarded = [];

for (let index = 0; index < incoming.length; index += 1) {
  const argument = incoming[index];

  if (argument === "--strictPort") {
    continue;
  }

  if (argument === "--host") {
    forwarded.push("--hostname", incoming[index + 1]);
    index += 1;
    continue;
  }

  if (argument.startsWith("--host=")) {
    forwarded.push("--hostname", argument.slice("--host=".length));
    continue;
  }

  forwarded.push(argument);
}

const child = spawn(process.execPath, [nextBin, "dev", ...forwarded], {
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 1);
});
