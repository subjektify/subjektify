import { SubjektModel } from "subjekt";
import { CodeGenConfig } from "../types";
import { CodeGeneratorFactory } from "./targets";

export const generate = async (config: CodeGenConfig, model: SubjektModel) => {
    const generator = CodeGeneratorFactory.generator(config);
    await generator.generate(model);
}
