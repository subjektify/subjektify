import { SubjektModel } from "subjekt";
import { CodeGenerator } from "./base";
import { SubjektifyModel } from "@subjektifylabs/subjektify-build/dist/core/types";

export class ClientGenerator extends CodeGenerator {
    extension(): string {
        return this.config.language == 'typescript' ? '.ts' : '.js';
    }
    async generate(model: SubjektifyModel) {
        return Promise.resolve();
    }
}
