/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { SubjektifyRuntimeEnvironment } from "subjektify";
import { CodeGenConfig } from "../types";
import { CodeGenerator } from "./generator";
import { EmptyGenerator } from "../generators";

export class CodeGeneratorFactory {
    static generator(config: CodeGenConfig, sre: SubjektifyRuntimeEnvironment): CodeGenerator {
        switch (config.target) {
            default:
                return new EmptyGenerator(config, sre);
        }
    }
}