/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import {
  SubjektifyConfig,
  SubjektifyRuntimeEnvironment,
  TaskArguments,
  extendConfig,
  task,
} from "subjektify";
import { subjektifyBuildTask } from "@subjektifylabs/subjektify-build/dist/core/build";
import { subjektifyCodeGenTask } from "./codegen";
import "./types";

extendConfig((config: SubjektifyConfig) => {
  if (!config.codegen) {
    config.codegen = [];
  }
});

task(
  "codegen",
  "Builds your Subjekt model and adds the artifacts to the runtime environment",
  async (taskArguments: TaskArguments, sre: SubjektifyRuntimeEnvironment) => {
    await subjektifyBuildTask(taskArguments, sre);
    await subjektifyCodeGenTask(taskArguments, sre);
  },
);

export * from "./types";
