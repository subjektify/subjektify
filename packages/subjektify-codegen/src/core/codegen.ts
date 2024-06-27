import { Log, SubjektifyRuntimeEnvironment, TaskArguments } from "subjektify";
import { SubjektModel } from "subjekt";
import { render } from "./render";
import "@subjektifylabs/subjektify-build/dist/core/types";
import { CodeGenConfig } from "./types";

export const subjektifyCodeGenTask = async (taskArguments: TaskArguments, sre: SubjektifyRuntimeEnvironment) => {
    Log.info("Generating code from model...");

    const codegenConfig = sre.config.codegen || [];
    const model = sre.model.semantic;

    if (!model) {
        Log.warn("No model found to generate code. Exiting...");
        return;
    }

    Log.debug(`Generating code for model: ${JSON.stringify(model)}`);

    for (const configItem of codegenConfig) {
        await generateCodeForTarget(configItem, model);
    }

    Log.success("Code generated successfully.");
};

const generateCodeForTarget = async (configItem: CodeGenConfig, model: SubjektModel) => {
    const { target, language, outputDirectory } = configItem;
    let out = outputDirectory || target;

    // Call the template renderer to generate code
    await render(target, language, out, model);
};
