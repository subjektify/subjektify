import { Log, SubjektifyConfig, SubjektifyRuntimeEnvironment, TaskArguments, extendConfig, task } from "subjektify";
import { subjektifyBuildTask } from "@subjektifylabs/subjektify-build";

import "./type-extensions";

extendConfig((config: SubjektifyConfig) => {
    config.codegen = [];
});

task("codegen", "Builds your Subjekt model and adds the artifacts to the runtime environment", async (taskArguments: TaskArguments, sre: SubjektifyRuntimeEnvironment) => {
    await subjektifyBuildTask(taskArguments, sre);
    await subjektifyCodeGenTask(taskArguments, sre);
});

export const subjektifyCodeGenTask = async (taskArguments: TaskArguments, sre: SubjektifyRuntimeEnvironment) => {
    Log.info("Generating code from model...");

    const config = sre.config;
    const model = sre.model.semantic;

    if (!model) {
        Log.warn("No model found to generate code. Exiting...");
        return;
    }

    Log.debug(`Generating code for model: ${JSON.stringify(model)}`);

    Log.success("Code generated successfully.");
}

export * from "./type-extensions";
