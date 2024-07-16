import { SubjektifyModel } from "@subjektifylabs/subjektify-build/dist/core/types";
import { CodeGenConfig } from "../types";
import { CodeGeneratorFactory } from "./targets";
import { SubjektifyConfig } from "subjektify";

// Generate code from the model using the specified configuration.
// This version of the plugin uses Eta templates to generate code for the specified target.
export const generate = async (
  config: CodeGenConfig,
  subjektifyConfig: SubjektifyConfig,
  model: SubjektifyModel,
) => {
  const generator = CodeGeneratorFactory.generator(config, subjektifyConfig);
  await generator.generate(model);
};
