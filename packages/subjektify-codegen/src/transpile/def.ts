/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { SubjektifyModel } from "@subjektifylabs/subjektify-build/dist/core/types";
import { TemplateRenderer } from "../render";
import { SubjektifyConfig } from "subjektify";
import { CodeGenConfig } from "../types";

export abstract class CodeTranspiler {
  renderer: TemplateRenderer;

  constructor(config: CodeGenConfig, subjektifyConfig: SubjektifyConfig) {
    this.renderer = new TemplateRenderer(config);
  }

  abstract transpile(model: SubjektifyModel): Promise<void>;
}
