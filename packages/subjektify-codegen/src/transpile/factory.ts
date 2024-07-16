/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { SubjektifyConfig } from "subjektify";
import { CodeTranspiler } from "./def";
import {
  JavascriptClientTranspiler,
  TypescriptClientTranspiler,
  JavascriptServerTranspiler,
  TypescriptServerTranspiler,
  SolidityContractTranspiler,
} from "./targets";
import { CodeGenConfig } from "../types";

export class CodeTranspilerFactory {
  static transpiler(
    config: CodeGenConfig,
    subjektifyConfig: SubjektifyConfig,
    outputDirectory: string
  ): CodeTranspiler {
    const { target } = config;
    switch (target) {
      case "client":
        return this._clientTranspiler(config, subjektifyConfig, outputDirectory);
      case "contract":
        return this._contractTranspiler(config, subjektifyConfig, outputDirectory);
      case "server":
        return this._serverTranspiler(config, subjektifyConfig, outputDirectory);
      default:
        throw new Error(`Unknown target: ${target}`);
    }
  }

  private static _clientTranspiler(
    config: CodeGenConfig,
    subjektifyConfig: SubjektifyConfig,
    outputDirectory: string
  ): CodeTranspiler {
    const { language } = config;
    switch (language) {
      case "javascript":
        return new JavascriptClientTranspiler(config, subjektifyConfig, outputDirectory);
      case "typescript":
        return new TypescriptClientTranspiler(config, subjektifyConfig, outputDirectory);
      default:
        throw new Error(`Unknown language: ${language}`);
    }
  }

  private static _contractTranspiler(
    config: CodeGenConfig,
    subjektifyConfig: SubjektifyConfig,
    outputDirectory: string
  ): CodeTranspiler {
    const { language } = config;
    switch (language) {
      case "solidity":
        return new SolidityContractTranspiler(config, subjektifyConfig, outputDirectory);
      default:
        throw new Error(`Unknown language: ${language}`);
    }
  }

  private static _serverTranspiler(
    config: CodeGenConfig,
    subjektifyConfig: SubjektifyConfig,
    outputDirectory: string
  ): CodeTranspiler {
    const { language } = config;
    switch (language) {
      case "javascript":
        return new JavascriptServerTranspiler(config, subjektifyConfig, outputDirectory);
      case "typescript":
        return new TypescriptServerTranspiler(config, subjektifyConfig, outputDirectory);
      default:
        throw new Error(`Unknown language: ${language}`);
    }
  }
}
