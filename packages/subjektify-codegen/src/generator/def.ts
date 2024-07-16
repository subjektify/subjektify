/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import path from "path";
import { SubjektifyConfig } from "subjektify";
import { SubjektifyModel } from "@subjektifylabs/subjektify-build/dist/core/types";
import { TemplateRenderer } from "../render";
import { CodeTranspiler, CodeTranspilerFactory } from "../transpile";
import { CodeGenConfig } from "../types";
import { FsUtil } from "../util";

export abstract class CodeGenerator {
  config: CodeGenConfig;
  subjektifyConfig: SubjektifyConfig;
  renderer: TemplateRenderer;
  transpiler: CodeTranspiler;

  constructor(config: CodeGenConfig, subjektifyConfig: SubjektifyConfig) {
    this.config = config;
    this.subjektifyConfig = subjektifyConfig;
    this.renderer = new TemplateRenderer(config, this.outputDirectory());
    this.transpiler = CodeTranspilerFactory.transpiler(
      config,
      subjektifyConfig,
      this.outputDirectory()
    );
  }

  abstract generate(model: SubjektifyModel): Promise<void>;

  run(model: SubjektifyModel): Promise<void> {
    this.createOutputDirectory();
    this.generate(model);
    return this.transpiler.transpile(model);
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
