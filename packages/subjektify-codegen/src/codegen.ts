/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { Log, SubjektifyRuntimeEnvironment, TaskArguments } from "subjektify";
import { CodeGenEngine } from "./core";

export const subjektifyCodeGenTask = async (
  taskArguments: TaskArguments,
  sre: SubjektifyRuntimeEnvironment,
) => {
  Log.info("Running code generation...");

  const engine = new CodeGenEngine(sre);
  await engine.generate();

  /*const generators = CodeGeneratorRegistry.instance().generators(sre);
  for (const generator of generators) {
    await generator.run();
  }*/
  Log.success("Code generation completed successfully.");
};
