/**
 * Copyright (c) 2024 Subjektify Labs Ltd.
 */

import { CodeGenerator, CodeGeneratorRegistry } from "../generator";
import { SubjektifyRuntimeEnvironment } from "subjektify";

export class CodeGenEngine {
  private generators: CodeGenerator[];
  private sre: SubjektifyRuntimeEnvironment;

  constructor(sre: SubjektifyRuntimeEnvironment) {
    const registry = new CodeGeneratorRegistry();
    this.generators = registry.generators(sre);
    this.sre = sre;
  }

  async generate(): Promise<void> {
    const promises = this.generators.map((generator) => generator.run());
    return Promise.all(promises).then(() => {});
  }
}
