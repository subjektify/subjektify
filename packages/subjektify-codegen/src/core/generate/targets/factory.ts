import { SubjektifyConfig } from "subjektify";
import { CodeGenConfig } from "../../types";
import { CodeGenerator } from "./base";
import { ClientGenerator } from "./client";
import { ContractGenerator } from "./contract";
import { ServerGenerator } from "./server";

export class CodeGeneratorFactory {
  static generator(
    config: CodeGenConfig,
    subjektifyConfig: SubjektifyConfig,
  ): CodeGenerator {
    switch (config.target) {
      case "contract":
        return new ContractGenerator(config, subjektifyConfig);
      case "client":
        return new ClientGenerator(config, subjektifyConfig);
      case "server":
        return new ServerGenerator(config, subjektifyConfig);
      default:
        throw new Error(`Unknown target: ${config.target}`);
    }
  }
}
