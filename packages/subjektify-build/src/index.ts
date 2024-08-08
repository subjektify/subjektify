import {
  extendConfig,
  extendEnvironment,
  SubjektifyConfig,
  SubjektifyRuntimeEnvironment,
  task,
} from "subjektify";
import { subjektifyBuildTask } from "./build";

import "./types";

extendConfig((config: SubjektifyConfig) => {
  if (!config.build) {
    config.build = {
      sources: ["subjects"],
      outputDirectory: "artifacts",
    };
  }
});

extendEnvironment((sre: SubjektifyRuntimeEnvironment) => {
  sre.model = {
    ast: {},
    semantic: {},
    projections: {},
  };
});

task(
  "build",
  "Builds your Subjekt model and adds the artifacts to the runtime environment",
  async (taskArguments: any, sre: SubjektifyRuntimeEnvironment) => {
    await subjektifyBuildTask(taskArguments, sre);
  },
);

export * from "./types";
