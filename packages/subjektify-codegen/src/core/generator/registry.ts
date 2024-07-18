/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { AbstractCodeGenerator } from "./def";
import { CodeGenConfig } from "../../types";

export class CodeGeneratorRegistry {
  private static _instance: CodeGeneratorRegistry;

  registry: AbstractCodeGenerator[];

  private constructor() {
    this.registry = [];
  }

  static instance(): CodeGeneratorRegistry {
    if (!CodeGeneratorRegistry._instance) {
      CodeGeneratorRegistry._instance = new CodeGeneratorRegistry();
    }
    return CodeGeneratorRegistry._instance;
  }

  register(generator: AbstractCodeGenerator) {
    this.registry.push(generator);
  }

  generators(): AbstractCodeGenerator[] {
    return this.registry;
  }

  generator(config: CodeGenConfig): AbstractCodeGenerator | undefined {
    const { target, language } = config;
    return this.registry.find(
      (g) => g.target() === target && g.language() === language,
    );
  }
}
