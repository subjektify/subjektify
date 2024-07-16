/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { SubjektifyConfig } from "subjektify";
import { CodeGenConfig } from "../types";
import { ClientGenerator, ContractGenerator, ServerGenerator } from "./targets";

export class CodeGeneratorFactory {
  static generator(config: CodeGenConfig, subjektifyConfig: SubjektifyConfig) {
    const { target } = config;
    switch (target) {
      case "contract":
        return new ContractGenerator(config, subjektifyConfig);
      case "client":
        return new ClientGenerator(config, subjektifyConfig);
      case "server":
        return new ServerGenerator(config, subjektifyConfig);
      default:
        throw new Error(`Unknown target: ${target}`);
    }
  }
}
