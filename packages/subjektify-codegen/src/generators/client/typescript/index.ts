import { AbstractCodeGenerator } from "../../../core";
import { CodeGenLanguage, CodeGenTarget } from "../../../types";

export class TypescriptClientGenerator extends AbstractCodeGenerator {
  target(): CodeGenTarget {
    return "client";
  }

  language(): CodeGenLanguage {
    return "typescript";
  }

  async generate() {
    console.log("Generating Typescript client code...");
  }
}
