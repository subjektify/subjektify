/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { SubjektifyModel } from "@subjektifylabs/subjektify-build/dist/core/types";

export abstract class CodeTranspiler {
    abstract transpile(model: SubjektifyModel): Promise<void>;
}
