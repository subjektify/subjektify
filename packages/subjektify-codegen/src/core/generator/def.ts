/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import path from "path";
import { SubjektifyRuntimeEnvironment } from "subjektify";
import { SubjektifyModel } from "@subjektifylabs/subjektify-build/dist/core/types";
import { TemplateRenderer } from "../renderer";
import { CodeGenConfig, CodeGenLanguage, CodeGenTarget } from "../../types";
import { FsUtil } from "../util";

export interface CodeGenerator {
  run(): Promise<void>;
}

export abstract class AbstractCodeGenerator implements CodeGenerator {
  config: CodeGenConfig;
  sre: SubjektifyRuntimeEnvironment;
  renderer: TemplateRenderer;

  constructor(config: CodeGenConfig, sre: SubjektifyRuntimeEnvironment) {
    this.config = config;
    this.sre = sre;
    this.renderer = new TemplateRenderer(this.outputDirectory());
  }

  abstract target(): CodeGenTarget;
  abstract language(): CodeGenLanguage;
  abstract generate(model: SubjektifyModel): Promise<void>;

  async run() {
    const model = this.sre.model;
    this.createOutputDirectory();
    await this.generate(model);
  }

  createOutputDirectory(): void {
    FsUtil.mkdir(this.outputDirectory());
  }

  outputDirectory(): string {
    return this.config.outputDirectory
      ? path.resolve(process.cwd(), this.config.outputDirectory)
      : path.resolve(process.cwd(), this.config.target);
  }
}
