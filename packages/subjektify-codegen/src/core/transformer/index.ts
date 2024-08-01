import { Shapes, SubjektModel } from "subjekt";

export class SymbolTransformer {
  model: SubjektModel;

  constructor(model: SubjektModel) {
    this.model = model;
  }

  transform<IN, OUT>(element: IN): OUT {
    return element as any;
  }
}
