import { AbstractCodeGenerator } from "../../../core";

export class SolidityContractGenerator extends AbstractCodeGenerator {
  extension(): string {
    return "sol";
  }
  async generate() {
    console.log("Generating Typescript client code...");
  }
}
