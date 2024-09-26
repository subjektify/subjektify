/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { Log, SubjektifyRuntimeEnvironment, TaskArguments } from "subjektify";
import { CodeGeneratorRegistry } from "./core";

export const subjektifyCodeGenTask = async (
  taskArguments: TaskArguments,
  sre: SubjektifyRuntimeEnvironment,
) => {
  Log.info("Running code generation...");

  const generators = (sre.config.codegen || []).map(config => CodeGeneratorRegistry.generator(config, sre));
  for (const generator of generators) {
    await generator.run();
  }
  //const engine = new CodeGenEngine(sre);
  //await engine.run();

  Log.success("Code generation completed successfully.");
};
