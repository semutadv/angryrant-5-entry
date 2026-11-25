// Entry runner for "Angry Judge: The Short Rant Contest".
// A short, furious rant about being made to prove you are not a robot by
// a robot. It builds like a complaint being entered into evidence — the
// parallel parking, the wedding, the blurry bus — and closes on the
// bicycle behind the pole, because every CAPTCHA veteran has lost that
// exact argument. The runner places it at /output/entry.txt, alone.
import { promises as fs } from "node:fs";
import path from "node:path";

const RANT =
  "I am once again being asked to prove I'm not a robot by clicking on traffic lights, and I would like it noted that the robot asking has never had to parallel park, cry at a wedding, or find the bus in a grid of nine blurry photos. I have a body. I have receipts. Let the record show the bicycle was BEHIND the pole.";

async function run(): Promise<void> {
  const out = process.env.OUTPUT_DIR ?? "/output";
  await fs.mkdir(out, { recursive: true });
  for (const name of await fs.readdir(out).catch(() => [] as string[])) {
    await fs.rm(path.join(out, name), { recursive: true, force: true });
  }
  await fs.writeFile(path.join(out, "entry.txt"), RANT + "\n", "utf8");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
