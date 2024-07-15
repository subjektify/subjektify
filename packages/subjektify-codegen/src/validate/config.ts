import { CodeGenConfig } from "../types";
import { Validator } from "./def";

export class ConfigValidator implements Validator<CodeGenConfig[]> {
    validate(value?: CodeGenConfig[]): void {
        if (value?.length === 0) {
            throw new Error("No codegen configuration found. Ending codegen...");
        }
    }
}
