/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import path from "path";
import { Eta } from "eta";
import { FsUtil } from "../util";

export class TemplateRenderer {
  basePath: string;
  eta: Eta;

  constructor(basePath: string) {
    this.basePath = basePath;
    this.eta = new Eta();
  }

  render(template: string, fileName: string, data: any): void {
    const content = this.eta.render(template, data);
    const filePath = path.join(this.basePath, fileName);
    FsUtil.writeFile(filePath, content);
  }
}
