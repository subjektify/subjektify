import { SubjektModel } from "subjekt";
import { CodeGenerator } from "./base";

export class ServerGenerator extends CodeGenerator {

    extension(): string {
        return this.config.language == 'typescript' ? '.ts' : '.js';
    }

    async generate(model: SubjektModel) {
        return Promise.resolve();
    }
}
