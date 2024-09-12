/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { SubjektifyRuntimeEnvironment } from "subjektify";
import { CodeGenerator } from "./def";
import {
  JavascriptClientGenerator,
  JavascriptServerGenerator,
  SolidityContractGenerator,
  TypescriptClientGenerator,
  TypescriptServerGenerator,
} from "../../generators";
import { CodeGenConfig } from "../../types";

export class CodeGeneratorRegistry {
  generators(sre: SubjektifyRuntimeEnvironment): CodeGenerator[] {
    const registry: CodeGenerator[] = [];
    const codegenConfigs = sre.config.codegen;
    if (!codegenConfigs) {
      throw new Error("No codegen configuration found.");
    }
    for (const config of codegenConfigs) {
      const generator = this._generator(config, sre);
      registry.push(generator);
    }
    return registry;
  }

  private _generator(
    config: CodeGenConfig,
    sre: SubjektifyRuntimeEnvironment,
  ): CodeGenerator {
    const { target } = config;
    switch (target) {
      case "client":
        return this._clientGenerator(config, sre);
      case "contract":
        return this._contractGenerator(config, sre);
      case "server":
        return this._serverGenerator(config, sre);
      default:
        throw new Error(`Unknown codegen target: ${target}`);
    }
  }

  private _clientGenerator(
    config: CodeGenConfig,
    sre: SubjektifyRuntimeEnvironment,
  ): CodeGenerator {
    const { language } = config;
    switch (language) {
      case "javascript":
        return new JavascriptClientGenerator(config, sre);
      case "typescript":
        return new TypescriptClientGenerator(config, sre);
      default:
        throw new Error(
          `Unknown codegen language "${language}" for client target`,
        );
    }
  }

  private _contractGenerator(
    config: CodeGenConfig,
    sre: SubjektifyRuntimeEnvironment,
  ): CodeGenerator {
    const { language } = config;
    switch (language) {
      case "solidity":
        return new SolidityContractGenerator(config, sre);
      default:
        throw new Error(
          `Unknown codegen language "${language}" for contract target`,
        );
    }
  }

  private _serverGenerator(
    config: CodeGenConfig,
    sre: SubjektifyRuntimeEnvironment,
  ): CodeGenerator {
    const { language } = config;
    switch (language) {
      case "javascript":
        return new JavascriptServerGenerator(config, sre);
      case "typescript":
        return new TypescriptServerGenerator(config, sre);
      default:
        throw new Error(
          `Unknown codegen language "${language}" for server target`,
        );
    }
  }
}
