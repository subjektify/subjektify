/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { SubjektifyConfig } from "subjektify";
import { CodeTranspiler } from "./def";
import { CodeGenConfig } from "../types";

export class CodeTranspilerFactory {
    static transpiler(config: CodeGenConfig, subjektifyConfig: SubjektifyConfig): CodeTranspiler {
        throw new Error("Method not implemented.");
    }
}
