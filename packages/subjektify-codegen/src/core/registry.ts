/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { SubjektifyRuntimeEnvironment } from "subjektify";
import { CodeGenerator } from "./generator";
import {
    JavaScriptClientGenerator,
    TypeScriptClientGenerator,
    SolidityContractGenerator
 } from "../generators";
import { CodeGenConfig } from "../types";

export class CodeGeneratorRegistry {
    static generator(config: CodeGenConfig, sre: SubjektifyRuntimeEnvironment): CodeGenerator {
        switch (config.target) {
            case 'contract':
                return this._contractGenerators(config, sre);
            case 'client':
                return this._clientGenerators(config, sre);
            default:
                throw new Error(`Unsupported target: ${config.target}`);
        }
    }

    private static _clientGenerators(config: CodeGenConfig, sre: SubjektifyRuntimeEnvironment): CodeGenerator {
        switch (config.language) {
            case 'javascript':
                return new JavaScriptClientGenerator(config, sre);
            case 'typescript':
                return new TypeScriptClientGenerator(config, sre);
            default:
                throw new Error(`Unsupported language: ${config.language}`);
        }
    }

    private static _contractGenerators(config: CodeGenConfig, sre: SubjektifyRuntimeEnvironment): CodeGenerator {
        switch (config.language) {
            case 'solidity':
                return new SolidityContractGenerator(config, sre);
            default:
                throw new Error(`Unsupported language: ${config.language}`);
        }
    }
}