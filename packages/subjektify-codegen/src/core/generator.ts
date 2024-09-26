/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */
import path from "path";
import { SubjektifyRuntimeEnvironment } from "subjektify";
import { CodeGenConfig } from "../types";
import { FsUtil } from "../util";

export interface CodeGenerator {
    run(): Promise<void>;
}

export abstract class AbstractCodeGenerator implements CodeGenerator {

    protected config: CodeGenConfig;
    protected sre: SubjektifyRuntimeEnvironment;

    constructor(config: CodeGenConfig, sre: SubjektifyRuntimeEnvironment) {
        this.config = config;
        this.sre = sre;
    }

    abstract extension(): string;
    abstract generate(): Promise<void>;

    async run() {
        this.createOutputDirectory();
        await this.generate();
    }

    protected createOutputDirectory() {
        FsUtil.mkdir(this.getOutputDirectory());
    }

    protected getOutputDirectory(): string {
      return this.config.outputDirectory
        ? path.resolve(process.cwd(), this.config.outputDirectory)
        : path.resolve(process.cwd(), this.config.target, this.config.language);
    }
}
