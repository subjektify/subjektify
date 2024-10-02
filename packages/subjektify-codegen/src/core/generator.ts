/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */
import path from "path";
import { SubjektifyRuntimeEnvironment } from "subjektify";
import { CodeGenConfig } from "../types";
import { FsUtil } from "../util";
import { TemplateRenderer } from "./renderer";

export interface CodeGenerator {
    run(): Promise<void>;
}

export abstract class AbstractCodeGenerator implements CodeGenerator {

    protected config: CodeGenConfig;
    protected sre: SubjektifyRuntimeEnvironment;
    protected renderer: TemplateRenderer;

    constructor(config: CodeGenConfig, sre: SubjektifyRuntimeEnvironment) {
        this.config = config;
        this.sre = sre;
        this.renderer = new TemplateRenderer(
            config,
            this.extension(),
            this.getOutputDirectory(),
        );
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
