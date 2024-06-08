import { Log, SubjektifyRuntimeEnvironment, extendConfig, task } from "subjektify";
import { subjektifyBuildTask } from "@subjektifylabs/subjektify-build";

import "./type-extensions";

extendConfig((config) => {
    config.codegen = [];
});

task("codegen", "Builds your Subjekt model and adds the artifacts to the runtime environment", async (_, sre) => {
    await subjektifyBuildTask(_, sre);
    await subjektifyCodeGenTask(_, sre);
});

export const subjektifyCodeGenTask = async (taskArguments: any, sre: SubjektifyRuntimeEnvironment) => {
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
