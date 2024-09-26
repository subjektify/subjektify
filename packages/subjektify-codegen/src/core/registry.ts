/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { SubjektifyRuntimeEnvironment } from "subjektify";
import { CodeGenerator } from "./generator";
import { EmptyGenerator } from "../generators";
import { CodeGenConfig } from "../types";

export class CodeGeneratorRegistry {
    static generator(config: CodeGenConfig, sre: SubjektifyRuntimeEnvironment): CodeGenerator {
        return new EmptyGenerator(config, sre);
    }
}