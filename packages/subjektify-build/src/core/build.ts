import { Log, SubjektifyRuntimeEnvironment } from "subjektify";
import { SubjektifyParser } from "./parse";
import { SubjektifyMerger } from "./merge";
import { ProjectionApplier } from "./projections";
import { SubjektifyBuildWriter } from "./writer";

export const subjektifyBuildTask = async (
  taskArguments: any,
  sre: SubjektifyRuntimeEnvironment,
) => {
  Log.info("Building model from sources...");

  const config = sre.config;
  const buildConfig = config.build || {};
  const sources = buildConfig.sources || [];
  const outputDirectory = buildConfig.outputDirectory;
  const projectionsConfig = buildConfig.projections || [];

  if (sources?.length === 0) {
    Log.warn("No sources found to build. Exiting subjektify-build...");
    return;
  }

  const parser = new SubjektifyParser(config.namespace, sources);
  const merger = new SubjektifyMerger();
  const projectionApplier = new ProjectionApplier(projectionsConfig);
  const writer = new SubjektifyBuildWriter();

  const astModels = parser.parseAstModels();
  const semanticModels = parser.parseSubjektModels();

  const mergedAstModel = merger.mergeAstModels(astModels);
  const mergedSemanticModel = merger.mergeSubjektModels(semanticModels);
  const projectedAstModels = projectionApplier.projectAstModel(mergedAstModel);
  const projectedModels = projectionApplier.apply(mergedSemanticModel);

  Log.verbose(`Merged AST model:  ${JSON.stringify(mergedAstModel)}`);
  Log.verbose(`Merged semantic model: ${JSON.stringify(mergedSemanticModel)}`);

  sre.model = {
    ast: mergedAstModel,
    semantic: mergedSemanticModel,
    projections: projectedModels,
  };

  if (outputDirectory) {
    Log.info(`Writing models to output directory: ${outputDirectory}`);
    writer.write(mergedAstModel, projectedAstModels, outputDirectory);
  }

  Log.success("Model built successfully.");
};
