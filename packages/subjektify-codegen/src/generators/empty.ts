import { AbstractCodeGenerator } from "../core";

export class EmptyGenerator extends AbstractCodeGenerator {
    extension(): string {
        return "md";
    }
    async generate() {
        console.log("Hello, World!");
    }
}
