import { Log, SubjektifyRuntimeEnvironment, extendEnvironment, task } from "subjektify";
import { parseSources } from "./parse";
import { mergeModels } from "./merge";

import "./type-extensions";

extendEnvironment((sre) => {
    sre.astModel = {};
    sre.semanticModel = {};
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
    sre.semanticModel = mergedModel;

    Log.success("Model built successfully.");
}
