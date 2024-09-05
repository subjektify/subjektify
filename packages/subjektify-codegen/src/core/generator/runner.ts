/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { CodeGenerator } from "./def";

export class CodeGeneratorRunner {

    private _generator?: CodeGenerator;

    constructor() {
    }

    generator(generator: CodeGenerator): CodeGeneratorRunner {
        this._generator = generator;
        return this;
    }

    run(): Promise<void> {
        if (!this._generator) {
            throw new Error("No generator found.");
        }
        return this._runRoutine();
    }

    private _runRoutine(): Promise<void> {
        return this._generator!.run();
    }
}