/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { SubjektifyConfig } from "subjektify";
import { SubjektifyModel } from "@subjektifylabs/subjektify-build/dist/core/types";
import { TemplateRenderer } from "../render";
import { CodeTranspiler, CodeTranspilerFactory } from "../transpile";
import { CodeGenConfig } from "../types";

export abstract class CodeGenerator {
  renderer: TemplateRenderer;
  transpiler: CodeTranspiler;

  constructor(config: CodeGenConfig, subjektifyConfig: SubjektifyConfig) {
    this.renderer = new TemplateRenderer(config);
    this.transpiler = CodeTranspilerFactory.transpiler(
      config,
      subjektifyConfig,
    );
  }

  run(model: SubjektifyModel): Promise<void> {
    this.generate(model);
    return this.transpiler.transpile(model);
  }

  abstract generate(model: SubjektifyModel): Promise<void>;
}
