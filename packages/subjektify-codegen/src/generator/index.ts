/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { SubjektifyRuntimeEnvironment } from "subjektify";
import { CodeGeneratorFactory } from "./factory";
import { CodeGenConfig } from "../types";
import { ConfigValidator } from "../validate";

export const generate = async (sre: SubjektifyRuntimeEnvironment) => {
    const codegenConfig = sre.config.codegen || [];
    const configValidator = new ConfigValidator();

    configValidator.validate(codegenConfig);

    for (const configItem of codegenConfig) {
        await _generate(configItem, sre);
    }
}

const _generate = async (configItem: CodeGenConfig, sre: SubjektifyRuntimeEnvironment) => {
    const model = sre.model;
    const generator = CodeGeneratorFactory.generator(configItem, sre.config);
    await generator.run(model);
}
