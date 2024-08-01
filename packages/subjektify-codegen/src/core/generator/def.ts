/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import path from "path";
import { SubjektifyRuntimeEnvironment } from "subjektify";
import { SubjektifyModel } from "@subjektifylabs/subjektify-build/dist/core/types";
import { TemplateRenderer } from "../renderer";
import { CodeGenConfig } from "../../types";
import { FsUtil } from "../util";
import { SymbolTransformer } from "../transformer";
import { SymbolProvider } from "../symbol";

export interface ICodeGenerator {
  createSymbolProvider(): SymbolProvider;
  generateBehavior(): Promise<void>;
  generateEnum(): Promise<void>;
  generateError(): Promise<void>;
  generateEvent(): Promise<void>;
  generateList(): Promise<void>;
  generateMap(): Promise<void>;
  generateStructure(): Promise<void>;
  generateSubject(): Promise<void>;
  beforeGeneration(): Promise<void>;
  afterGeneration(): Promise<void>;
}

export interface CodeGenerator {
  run(): Promise<void>;
}

export abstract class AbstractCodeGenerator implements CodeGenerator {
  config: CodeGenConfig;
  sre: SubjektifyRuntimeEnvironment;
  renderer: TemplateRenderer;
  transformer: SymbolTransformer;

  constructor(config: CodeGenConfig, sre: SubjektifyRuntimeEnvironment) {
    this.config = config;
    this.sre = sre;
    this.renderer = new TemplateRenderer(this.outputDirectory(), this.extension());
    this.transformer = new SymbolTransformer(sre.model.semantic);
  }

  abstract extension(): string;
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
