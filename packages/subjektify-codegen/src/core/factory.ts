/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { SubjektifyRuntimeEnvironment } from "subjektify";
import { CodeGenerator } from "./generator";
import { EmptyGenerator } from "../generators";
import { CodeGenConfig } from "../types";

export class CodeGeneratorFactory {
    static generator(config: CodeGenConfig, sre: SubjektifyRuntimeEnvironment): CodeGenerator {
        switch (config.target) {
            default:
                return new EmptyGenerator(config, sre);
        }
    }
}