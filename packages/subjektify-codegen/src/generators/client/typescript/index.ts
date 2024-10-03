import { AbstractCodeGenerator } from "../../../core";

export class TypeScriptClientGenerator extends AbstractCodeGenerator {
    defaultExtension(): string {
        return "ts";
    }
    generate(): Promise<void> {
        this.renderer.render("tsconfig.json", "tsconfig", {}, "json");
        return Promise.resolve();
    }
}
