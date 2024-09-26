import { SubjektifyRuntimeEnvironment } from "subjektify";
import { AbstractCodeGenerator } from "../core";
import { CodeGenConfig } from "../types";

export class EmptyGenerator extends AbstractCodeGenerator {

    constructor(config: CodeGenConfig, sre: SubjektifyRuntimeEnvironment) {
        super(config, sre);
    }

    extension(): string {
        return "md";
    }

    async generate(): Promise<void> {
        console.log("Hello, World!");
    }
}
