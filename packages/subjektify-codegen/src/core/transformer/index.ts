import { SubjektifyModel } from "@subjektifylabs/subjektify-build/dist/core/types";
import { Shapes } from "subjekt";

export class SymbolTransformer {
  model: SubjektifyModel;

  constructor(model: SubjektifyModel) {
    this.model = model;
  }

  simpleTypes(): Shapes {
    return {};
  }

  aggregateTypes(): Shapes {
    return {};
  }

  subjectTypes(): Shapes {
    return {};
  }
}
