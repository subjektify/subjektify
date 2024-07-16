/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { CodeGenerator } from "../def";
import { SubjektifyModel } from "@subjektifylabs/subjektify-build/dist/core/types";

export class ClientGenerator extends CodeGenerator {
  async generate(model: SubjektifyModel) {
    this._generatePackageJson();
  }

  _generatePackageJson() {
    this.renderer.render("package.json.eta", {
      namespace: this.config.packageName || this.subjektifyConfig.namespace,
      version: this.subjektifyConfig.version,
      license: this.subjektifyConfig.license,
    }, "package.json");
  }
}
