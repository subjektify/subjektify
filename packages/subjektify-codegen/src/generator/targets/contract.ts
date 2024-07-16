/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { CodeGenerator } from "../def";
import { SubjektifyModel } from "@subjektifylabs/subjektify-build/dist/core/types";

export class ContractGenerator extends CodeGenerator {

    async generate(model: SubjektifyModel) {
        return Promise.resolve();
    }
}
