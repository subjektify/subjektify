/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { Log, SubjektifyRuntimeEnvironment, TaskArguments } from "subjektify";
import { ModelValidator } from "./validate";
import { generate } from "./generator";

export const subjektifyCodeGenTask = async (taskArguments: TaskArguments, sre: SubjektifyRuntimeEnvironment) => {

    // Validate the model exists before generating code
    const modelValidator = new ModelValidator();
    modelValidator.validate(sre.model);

    await generate(sre);

    Log.success("Code generated successfully!");
}
