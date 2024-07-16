/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import path from "path";
import { Eta } from "eta";
import { CodeGenConfig } from "../types";

export class TemplateRenderer {
  readonly templatePath: string;
  eta: Eta;
  config: CodeGenConfig;

  constructor(config: CodeGenConfig) {
    this.templatePath = path.join(
      __dirname,
      "..",
      "templates",
      config.target,
      config.language,
    );
    this.config = config;
    this.eta = new Eta({
      views: this.templatePath,
    });
  }

  render(template: string, data: any): string {
    return this.eta.render(template, data);
  }
}
