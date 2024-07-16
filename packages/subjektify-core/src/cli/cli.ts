import { Log } from "../util";
import { describeCli } from "./def";
import { run } from "./run";

async function main() {
  // Parse CLI arguments
  let args = await parseCli();

  // Set global logging level
  args.debug && Log.setDebug(args.debug);
  args.verbose && Log.setVerbose(args.verbose);

  // Run the command
  return run(args);
}

function parseCli() {
  return describeCli().parse();
}

main()
  .then(() => process.exit(process.exitCode))
  .catch((error) => {
    Log.error(error);
    process.exit(1);
  });
