import { Log, SubjektifyConfig, SubjektifyRuntimeEnvironment, TaskArguments, extendConfig, task } from "subjektify";
import { subjektifyBuildTask } from "@subjektifylabs/subjektify-build/dist/core/build";
import "@subjektifylabs/subjektify-build/dist/core/types";

import "./types";

extendConfig((config: SubjektifyConfig) => {
    if (!config.codegen) {
        config.codegen = [];
    }
    Log.verbose(`Extending config with codegen: ${JSON.stringify(config.codegen)}`);
});

task("codegen", "Builds your Subjekt model and adds the artifacts to the runtime environment", async (taskArguments: TaskArguments, sre: SubjektifyRuntimeEnvironment) => {
    await subjektifyBuildTask(taskArguments, sre);
    await SubjektifyCodeGenTask(taskArguments, sre);
});

export const SubjektifyCodeGenTask = async (taskArguments: TaskArguments, sre: SubjektifyRuntimeEnvironment) => {
    Log.info("Generating code from model...");

    const codegenConfig = sre.config.codegen;
    const model = sre.model.semantic;

    if (!model) {
        Log.warn("No model found to generate code. Exiting...");
        return;
    }

    Log.debug(`Generating code for model: ${JSON.stringify(model)}`);

    Log.success("Code generated successfully.");
}

export * from "./types";
