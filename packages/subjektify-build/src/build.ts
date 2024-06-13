import { Log, SubjektifyRuntimeEnvironment } from "subjektify";
import { parseSources } from "./parse";
import { mergeModels } from "./merge";

export const SubjektifyBuildTask = async (taskArguments: any, sre: SubjektifyRuntimeEnvironment) => {
    Log.info("Building model from sources...");

    const config = sre.config;
    const buildConfig = config.build || {};
    const sources = buildConfig.sources || [];

    if (sources?.length === 0) {
        Log.warn("No sources found to build. Exiting...");
        return;
    }

    const models = await parseSources(config.namespace, sources);
    const mergedModel = mergeModels(models);

    sre.model.semantic = mergedModel;

    Log.success("Model built successfully.");
}
