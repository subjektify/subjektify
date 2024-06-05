import { Log, task } from "subjektify";
import { parseSources } from "./parse";

task("build", "Builds your Subjekt model and adds the artifacts to the runtime environment", async (_, sre) => {

    Log.verbose("Building model from sources...");

    const config = sre.config;
    const sources = config.sources ?? [];

    if (sources?.length === 0) {
        Log.warn("No sources found to build. Exiting...");
        return;
    }

    const models = await parseSources(config.namespace, sources);
});
