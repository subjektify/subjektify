import { AbstractCodeGenerator } from "../../../core";

export class TypescriptClientGenerator extends AbstractCodeGenerator {
  extension(): string {
    return "ts";
  }
  async generate() {
    this.renderer.render("index", "index", {});
    this.renderer.render("tsconfig.json", "tsconfig", {}, "json");
    this.renderer.render("package.json", "package", {
      namespace: this.sre.config.namespace,
      version: this.sre.config.version,
      license: this.sre.config.license,
    }, "json");
  }
}
