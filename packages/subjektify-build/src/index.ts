import { Log, SubjektifyRuntimeEnvironment, extendEnvironment, task } from "subjektify";
import { parseSources } from "./parse";
import { mergeModels } from "./merge";

import "./type-extensions";

// TODO: Remove after adding development environment.
Log.setVerbose(true);

extendEnvironment((sre) => {
    sre.model = {};
});

task("build", "Builds your Subjekt model and adds the artifacts to the runtime environment", async (_, sre) => {
    await subjektifyBuildTask(_, sre);
});

export const subjektifyBuildTask = async (taskArguments: any, sre: SubjektifyRuntimeEnvironment) => {
    Log.info("Building model from sources...");

    const config = sre.config;
    const sources = config.sources || [];

    if (sources?.length === 0) {
        Log.warn("No sources found to build. Exiting...");
        return;
    }

    const models = await parseSources(config.namespace, sources);
    const mergedModel = mergeModels(models);
    sre.model = mergedModel;

    Log.success("Model built successfully.");
}
