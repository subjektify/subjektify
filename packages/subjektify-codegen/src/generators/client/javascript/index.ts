import { AbstractCodeGenerator } from "../../../core";

export class JavaScriptClientGenerator extends AbstractCodeGenerator {
    defaultExtension(): string {
        return "js";
    }
    generate(): Promise<void> {
        return Promise.resolve();
    }
}
