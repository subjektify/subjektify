/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { CodeGenerator, CodeGeneratorRegistry } from "../generator";
import { SubjektifyRuntimeEnvironment } from "subjektify";

export class CodeGenEngine {
    private generators: CodeGenerator[];
    private sre: SubjektifyRuntimeEnvironment;

    constructor(sre: SubjektifyRuntimeEnvironment) {
        this.sre = sre;
        this.generators = CodeGeneratorRegistry.instance().generators(sre);
    }

    generate(): Promise<void> {
        const promises = this.generators.map((generator) => generator.run());
        return Promise.all(promises).then(() => {});
    }
}
