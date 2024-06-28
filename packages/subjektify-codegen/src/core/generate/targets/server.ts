import { CodeGenerator } from "./base";
import { SubjektifyModel } from "@subjektifylabs/subjektify-build/dist/core/types";

export class ServerGenerator extends CodeGenerator {

    async generate(model: SubjektifyModel) {
        return Promise.resolve();
    }
}
