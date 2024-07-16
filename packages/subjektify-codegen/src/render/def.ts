/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import path from "path";
import { Eta } from "eta";
import { CodeGenConfig } from "../types";
import { FsUtil } from "../util";

export class TemplateRenderer {
  readonly templatePath: string;
  eta: Eta;
  config: CodeGenConfig;
  outputDirectory: string;

  constructor(config: CodeGenConfig, outputDirectory: string) {
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
    this.outputDirectory = outputDirectory;
  }

  render(template: string, data: any, fileName: string): void {
    const outputPath = path.join(this.outputDirectory, fileName);
    const content = this.eta.render(template, data);
    FsUtil.writeFile(outputPath, content);
  }
}
