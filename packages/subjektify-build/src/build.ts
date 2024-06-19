import { Log, SubjektifyRuntimeEnvironment } from "subjektify";
import { SubjektifyParser } from "./parse";
import { SubjektifyMerger } from "./merge";

export const subjektifyBuildTask = async (taskArguments: any, sre: SubjektifyRuntimeEnvironment) => {
    Log.info("Building model from sources...");

    const config = sre.config;
    const buildConfig = config.build || {};
    const sources = buildConfig.sources || [];

    if (sources?.length === 0) {
        Log.warn("No sources found to build. Exiting subjektify-build...");
        return;
    }

    const parser = new SubjektifyParser(config.namespace, sources);
    const merger = new SubjektifyMerger();

    const astModels = parser.parseAstModels();
    const subjektModels = parser.parseSubjektModels();

    const mergedAstModel = merger.mergeAstModels(astModels);
    const mergedSubjektModel = merger.mergeSubjektModels(subjektModels);

    sre.model.ast = mergedAstModel;
    sre.model.semantic = mergedSubjektModel;

    Log.success("Model built successfully.");
}
