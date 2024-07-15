import { SubjektifyModel } from "@subjektifylabs/subjektify-build";
import { Validator } from "./def";

export class ModelValidator implements Validator<SubjektifyModel> {
    validate(value?: SubjektifyModel): void {
        if (!value) {
            throw new Error("No model found to generate code. Ending codegen...");
        }
    }
}
