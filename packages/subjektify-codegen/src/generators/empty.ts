import { SubjektifyRuntimeEnvironment } from "subjektify";
import { CodeGenConfig } from "../types";
import { AbstractCodeGenerator } from "../core";

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
