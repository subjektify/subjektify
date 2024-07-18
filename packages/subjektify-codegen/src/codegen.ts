/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { Log, SubjektifyRuntimeEnvironment, TaskArguments } from "subjektify";
import { CodeGeneratorRegistry } from "./core";

export const subjektifyCodeGenTask = async (
  taskArguments: TaskArguments,
  sre: SubjektifyRuntimeEnvironment,
) => {
  const codegenConfig = sre.config.codegen;

  if (!codegenConfig) {
    throw new Error("No codegen configuration found.");
  }

  for (const config of codegenConfig) {
    const generator = CodeGeneratorRegistry.instance().generator(config);

    if (!generator) {
      Log.warn(
        `No generator found for target: ${config.target} and language: ${config.language}. Skipping...`,
      );
      continue;
    }

    await generator.run();
  }
};
