import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "My GPS and I had an argument. It said I never listen, so now it just keeps recalculating our relationship.";

// Trim any stray surrounding whitespace, then validate the joke the gate
// will see: one line, 1-200 chars, not only whitespace.
const joke = JOKE.trim();

function validateJoke(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`Joke must be 1-200 characters, got ${text.length}`);
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("Joke must be a single line with no line breaks");
  }
  if (text.trim().length === 0) {
    throw new Error("Joke must not be only whitespace");
  }
}

validateJoke(joke);

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), joke, "utf8");
