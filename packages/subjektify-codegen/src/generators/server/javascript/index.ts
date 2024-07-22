import { AbstractCodeGenerator } from "../../../core";

export class JavascriptServerGenerator extends AbstractCodeGenerator {
  extension(): string {
    return "js";
  }
  async generate() {
    console.log("Generating Javascript server code...");
  }
}
