/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import {
  extendConfig,
  SubjektifyConfig,
  SubjektifyRuntimeEnvironment,
  task,
  TaskArguments,
} from "subjektify";
import { subjektifyBuildTask } from "@subjektifylabs/subjektify-build/dist/build";
import { subjektifyCodeGenTask } from "./codegen";
import "./types";

extendConfig((config: SubjektifyConfig) => {
  if (!config.codegen) {
    config.codegen = [];
  }
});

task(
  "codegen",
  "Generate clients, contracts, and servers from the Subjekt model",
  async (taskArguments: TaskArguments, sre: SubjektifyRuntimeEnvironment) => {
    await subjektifyBuildTask(taskArguments, sre);
    await subjektifyCodeGenTask(taskArguments, sre);
  },
);

export * from "./types";
