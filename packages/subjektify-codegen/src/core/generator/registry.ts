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

export class CodeGeneratorRegistry {
  private static _instance: CodeGeneratorRegistry;

  registry: CodeGenerator[];

  private constructor() {
    this.registry = [];
  }

  static instance(): CodeGeneratorRegistry {
    if (!CodeGeneratorRegistry._instance) {
      CodeGeneratorRegistry._instance = new CodeGeneratorRegistry();
    }
    return CodeGeneratorRegistry._instance;
  }

  generators(sre: SubjektifyRuntimeEnvironment): CodeGenerator[] {
    this._load(sre);
    return this.registry;
  }

  private _load(sre: SubjektifyRuntimeEnvironment) {
    const codegenConfigs = sre.config.codegen;
    if (!codegenConfigs) {
      throw new Error("No codegen configuration found.");
    }
    for (const config of codegenConfigs) {
      const generator = this._generator(config, sre);
      this.registry.push(generator);
    }
  }

  private _generator(
    config: any,
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
    config: any,
    sre: SubjektifyRuntimeEnvironment,
  ): CodeGenerator {
    const { language } = config;
    switch (language) {
      case "javascript":
        return new JavascriptClientGenerator(config, sre);
      case "typescript":
        return new TypescriptClientGenerator(config, sre);
      default:
        throw new Error(`Unknown codegen language: ${language}`);
    }
  }

  private _contractGenerator(
    config: any,
    sre: SubjektifyRuntimeEnvironment,
  ): CodeGenerator {
    const { language } = config;
    switch (language) {
      case "solidity":
        return new SolidityContractGenerator(config, sre);
      default:
        throw new Error(`Unknown codegen language: ${language}`);
    }
  }

  private _serverGenerator(
    config: any,
    sre: SubjektifyRuntimeEnvironment,
  ): CodeGenerator {
    const { language } = config;
    switch (language) {
      case "javascript":
        return new JavascriptServerGenerator(config, sre);
      case "typescript":
        return new TypescriptServerGenerator(config, sre);
      default:
        throw new Error(`Unknown codegen language: ${language}`);
    }
  }
}
