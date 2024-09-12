/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import path from "path";
import { Eta } from "eta";
import { FsUtil } from "../util";

export class TemplateRenderer {
  basePath: string;
  extension: string;
  eta: Eta;

  constructor(basePath: string, extension: string) {
    this.basePath = basePath;
    this.extension = extension;
    this.eta = new Eta({ views: basePath });
  }

  render(
    template: string,
    fileName: string,
    data: any,
    extension?: string,
  ): void {
    const ext = extension || this.extension;
    const content = this.eta.render(`${template}.eta`, data);
    const filePath = path.join(this.basePath, `${fileName}.${ext}`);
    FsUtil.writeFile(filePath, content);
  }
}
