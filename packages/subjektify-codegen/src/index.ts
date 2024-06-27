import { Log, SubjektifyConfig, SubjektifyRuntimeEnvironment, TaskArguments, extendConfig, task } from "subjektify";
import { subjektifyBuildTask } from "@subjektifylabs/subjektify-build/dist/core/build";
import "@subjektifylabs/subjektify-build/dist/core/types";
import { subjektifyCodeGenTask } from "./core/codegen";
import "./core/types";

extendConfig((config: SubjektifyConfig) => {
    if (!config.codegen) {
        config.codegen = [];
    }
    Log.verbose(`Extending config with codegen: ${JSON.stringify(config.codegen)}`);
});

task("codegen", "Builds your Subjekt model and adds the artifacts to the runtime environment", async (taskArguments: TaskArguments, sre: SubjektifyRuntimeEnvironment) => {
    await subjektifyBuildTask(taskArguments, sre);
    await subjektifyCodeGenTask(taskArguments, sre);
});

export * from "./core/types";
