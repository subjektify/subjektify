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
  await engine.run();

  Log.success("Code generation completed successfully.");
};
