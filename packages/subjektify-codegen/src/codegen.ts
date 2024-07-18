/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { Log, SubjektifyRuntimeEnvironment, TaskArguments } from "subjektify";
import { CodeGeneratorRegistry } from "./core";

export const subjektifyCodeGenTask = async (
  taskArguments: TaskArguments,
  sre: SubjektifyRuntimeEnvironment,
) => {
  const generators = CodeGeneratorRegistry.instance().generators(sre);
  for (const generator of generators) {
    await generator.run();
  }
  Log.success("Code generation completed successfully.");
};
