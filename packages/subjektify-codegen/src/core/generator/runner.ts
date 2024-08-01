/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { ICodeGenerator } from "./def";

export class CodeGeneratorRunner {

    private _generator?: ICodeGenerator;

    constructor() {
    }

    generator(generator: ICodeGenerator): CodeGeneratorRunner {
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
        return this._generator!.beforeGeneration()
            .then(() => this._generator!.createSymbolProvider())
            .then(() => this._generator!.generateBehavior())
            .then(() => this._generator!.generateEnum())
            .then(() => this._generator!.generateError())
            .then(() => this._generator!.generateEvent())
            .then(() => this._generator!.generateList())
            .then(() => this._generator!.generateMap())
            .then(() => this._generator!.generateStructure())
            .then(() => this._generator!.generateSubject())
            .then(() => this._generator!.afterGeneration());
    }
}