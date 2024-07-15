/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { Log, SubjektifyRuntimeEnvironment, TaskArguments } from "subjektify";
import { ConfigValidator, ModelValidator } from "./validate";

export const subjektifyCodeGenTask = async (taskArguments: TaskArguments, sre: SubjektifyRuntimeEnvironment) => {
    const configValidator = new ConfigValidator();
    const modelValidator = new ModelValidator();

    configValidator.validate(sre.config.codegen);
    modelValidator.validate(sre.model);
    
    Log.success("Code generated successfully!");
}
