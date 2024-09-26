import { SubjektifyRuntimeEnvironment } from "subjektify";
import { AbstractCodeGenerator } from "../core";
import { CodeGenConfig } from "../types";

export class EmptyGenerator extends AbstractCodeGenerator {

    extension(): string {
        return "md";
    }

    async generate(): Promise<void> {
        console.log("Hello, World!");
    }
}
