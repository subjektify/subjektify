/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { SubjektifyModel } from "@subjektifylabs/subjektify-build/dist/core/types";

export abstract class CodeGenerator {
    abstract generate(model: SubjektifyModel): Promise<void>;
}
