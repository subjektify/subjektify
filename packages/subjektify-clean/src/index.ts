import path from "path";
import { rimraf } from "rimraf";
import { Log, task } from "subjektify";
import "./types";

task("clean", async (_, sre) => {
  const CleanConfig = sre.config.clean || {};
  const paths = CleanConfig.paths || [];

  Log.info(`Cleaning ${paths.length} paths...`);

  for (const p of paths) {
    Log.verbose(`Deleting path: ${p}`);
    rimraf(path.join(process.cwd(), p), {});
  }

  Log.success("Cleaned paths successfully.");
});
