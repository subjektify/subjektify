import path from "path";
import { CodeGenerator } from "./base";
import { SubjektifyModel } from "@subjektifylabs/subjektify-build/dist/core/types";

export class ClientGenerator extends CodeGenerator {
  async generate(model: SubjektifyModel) {
    const outputDir = this.createOutputDirectory();

    // Create package.json
    const packageJson = this.eta.render("package.json.eta", {
      namespace: this.config.packageName || this.subjektifyConfig.namespace,
      version: this.subjektifyConfig.version,
      license: this.subjektifyConfig.license,
    });
    this.write(path.join(outputDir, "package.json"), packageJson);

    // Create the client source code
    this.transpiler.transpile(model);
  }
}
