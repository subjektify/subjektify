import { SubjektModel } from "subjekt";
import { CodeGenerator } from "./base";

export class ContractGenerator extends CodeGenerator {
    extension(): string {
        return '.sol';
    }
    async generate(model: SubjektModel) {
        Object.keys(model.shapes || {}).forEach(shape => {
            console.log(shape);
        });
        return Promise.resolve();
    }
}
