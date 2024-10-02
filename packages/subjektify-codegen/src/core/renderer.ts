/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import path from "path";
import { Eta } from "eta";
import { FsUtil } from "../util";
import { CodeGenConfig } from "../types";

export class TemplateRenderer {
  config: CodeGenConfig;
  defaultExtension: string;
  outputPath: string;
  eta: Eta;

  constructor(config: CodeGenConfig, defaultExtension: string, outputPath: string) {
    this.config = config;
    this.defaultExtension = defaultExtension;
    this.outputPath = outputPath;
    this.eta = new Eta({ views: this.getViewsPath() });
  }

  render(
    template: string,
    fileName: string,
    data: any,
    extension?: string,
  ): void {
    const ext = extension || this.defaultExtension;
    const content = this.eta.render(`${template}.eta`, data);
    const filePath = path.join(this.outputPath, `${fileName}.${ext}`);
    FsUtil.writeFile(filePath, content);
  }

  private getViewsPath(): string {
    return path.resolve(__dirname, "..", "templates", this.config.target, this.config.language);
  }
}
