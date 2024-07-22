import { AbstractCodeGenerator } from "../../../core";

export class TypescriptServerGenerator extends AbstractCodeGenerator {
  extension(): string {
    return "ts";
  }
  async generate() {
    console.log("Generating Javascript server code...");
  }
}
