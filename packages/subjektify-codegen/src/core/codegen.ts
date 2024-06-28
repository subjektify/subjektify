import { Log, SubjektifyRuntimeEnvironment, TaskArguments } from "subjektify";
import "@subjektifylabs/subjektify-build/dist/core/types";

import { generate } from "./generate";

export const subjektifyCodeGenTask = async (taskArguments: TaskArguments, sre: SubjektifyRuntimeEnvironment) => {
    Log.info("Generating code from model...");

    const subjektifyConfig = sre.config || {};
    const codegenConfig = subjektifyConfig.codegen || [];
    const model = sre.model;

    if (codegenConfig.length === 0) {
        Log.warn("No codegen configuration found. Ending codegen...");
        return;
    }

    if (!model) {
        Log.warn("No model found to generate code. Ending codegen...");
        return;
    }

    for (const configItem of codegenConfig) {
        await generate(configItem, subjektifyConfig, model);
    }

    Log.success("Code generated successfully!");
};
