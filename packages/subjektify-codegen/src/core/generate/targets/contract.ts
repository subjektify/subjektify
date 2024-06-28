import { CodeGenerator } from "./base";
import { SubjektifyModel } from "@subjektifylabs/subjektify-build/dist/core/types";

export class ContractGenerator extends CodeGenerator {
    async generate(model: SubjektifyModel) {
        const shapes = model.semantic.shapes || {};
        Object.keys(shapes || {}).forEach(shape => {
            const shapeModel = [shape] || {};
        });
        return Promise.resolve();
    }
}
