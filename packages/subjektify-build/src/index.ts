import {
  extendEnvironment,
  SubjektifyRuntimeEnvironment,
  task,
} from "subjektify";
import { subjektifyBuildTask } from "./core/build";

import "./core/types";

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

export * from "./core/types";
