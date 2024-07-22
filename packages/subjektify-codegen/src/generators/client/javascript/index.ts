import { AbstractCodeGenerator } from "../../../core";

export class JavascriptClientGenerator extends AbstractCodeGenerator {
  extension(): string {
    return "js";
  }
  async generate() {
    console.log("Generating Javascript client code...");
  }
}
