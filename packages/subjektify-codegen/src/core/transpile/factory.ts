import { CodeGenerator } from "../generate/targets";
import { CodeTranspiler } from "./base";
import { SolidityTranspiler } from "./solidity";
import {
  TypescriptClientTranspiler,
  TypescriptServerTranspiler,
} from "./typescript";

export class TranspilerFactory {
  static transpiler(generator: CodeGenerator): CodeTranspiler {
    const codegenConfig = generator.config;
    switch (codegenConfig.target) {
      case "client":
        return this._clientTranspiler(generator);
      case "contract":
        return this._contractTranspiler(generator);
      case "server":
        return this._serverTranspiler(generator);
      default:
        throw new Error(`Unknown target: ${codegenConfig.target}`);
    }
  }

  private static _clientTranspiler(generator: CodeGenerator): CodeTranspiler {
    const codegenConfig = generator.config;
    switch (codegenConfig.language) {
      case "typescript":
        return new TypescriptClientTranspiler(generator);
      default:
        this._throwUnknownLanguageError(codegenConfig.language);
    }
  }

  private static _contractTranspiler(generator: CodeGenerator): CodeTranspiler {
    const codegenConfig = generator.config;
    switch (codegenConfig.language) {
      case "typescript":
        return new SolidityTranspiler(generator);
      default:
        this._throwUnknownLanguageError(codegenConfig.language);
    }
  }

  private static _serverTranspiler(generator: CodeGenerator): CodeTranspiler {
    const codegenConfig = generator.config;
    switch (codegenConfig.language) {
      case "typescript":
        return new TypescriptServerTranspiler(generator);
      default:
        this._throwUnknownLanguageError(codegenConfig.language);
    }
  }

  private static _throwUnknownLanguageError(language: string): never {
    throw new Error(`Unknown language: ${language}`);
  }
}
