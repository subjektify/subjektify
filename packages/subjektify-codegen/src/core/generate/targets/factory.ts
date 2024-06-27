import { CodeGenConfig } from "../../types";
import { CodeGenerator } from "./base";
import { ClientGenerator } from "./client";
import { ContractGenerator } from "./contract";
import { ServerGenerator } from "./server";

export class CodeGeneratorFactory {
    static generator(config: CodeGenConfig): CodeGenerator {
        switch (config.target) {
            case "contract":
                return new ContractGenerator(config);
            case "client":
                return new ClientGenerator(config);
            case "server":
                return new ServerGenerator(config);
            default:
                throw new Error(`Unknown target: ${config.target}`);
        }
    }
}
