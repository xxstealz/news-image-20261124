import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const dest = join(outDir, "entry.png");
copyFileSync(src, dest);
// Verify the copy is complete: same byte size as the bundled image.
if (statSync(src).size !== statSync(dest).size) {
  throw new Error("entry.png copy is incomplete");
}
console.log(`wrote ${dest} (${statSync(dest).size} bytes)`);
