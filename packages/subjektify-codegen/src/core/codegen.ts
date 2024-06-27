import { Log, SubjektifyRuntimeEnvironment, TaskArguments } from "subjektify";
import "@subjektifylabs/subjektify-build/dist/core/types";
import { SubjektModel } from "subjekt";

import { generate } from "./generate";
import { render } from "./render";
import { CodeGenConfig } from "./types";

export const subjektifyCodeGenTask = async (taskArguments: TaskArguments, sre: SubjektifyRuntimeEnvironment) => {
    Log.info("Generating code from model...");

    const codegenConfig = sre.config.codegen || [];
    const model = sre.model.semantic;

    if (codegenConfig.length === 0) {
        Log.warn("No codegen configuration found. Ending codegen...");
        return;
    }

    if (!model) {
        Log.warn("No model found to generate code. Ending codegen...");
        return;
    }

    for (const configItem of codegenConfig) {
        await generate(configItem, model);
    }

    Log.success("Code generated successfully!");
};
