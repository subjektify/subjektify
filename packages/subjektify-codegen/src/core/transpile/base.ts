import { SubjektifyModel } from "@subjektifylabs/subjektify-build/dist/core/types";
import { CodeGenerator } from "../generate/targets";

export abstract class CodeTranspiler {

    generator: CodeGenerator;

    constructor(generator: CodeGenerator) {
        this.generator = generator;
    }

    abstract extension(): string;
    abstract transpile(model: SubjektifyModel): Promise<void>;
}
