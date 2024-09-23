/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { SubjektifyRuntimeEnvironment } from "subjektify";
import { AbstractCodeGenerator } from "./generator";
import { CodeGeneratorFactory } from "./factory";

export class CodeGenEngine {

    private _generators: AbstractCodeGenerator[];

    constructor(sre: SubjektifyRuntimeEnvironment) {
        this._generators = sre.config.codegen?.map(config => CodeGeneratorFactory.generator(config, sre)) ?? [];
    }
    
    async run(): Promise<void> {
        for (const generator of this._generators) {
            await generator.run();
        }
    }
}
