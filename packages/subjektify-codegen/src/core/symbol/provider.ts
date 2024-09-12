import { Shape } from "subjekt";

export interface SymbolProvider {
  toSymbol(shape: Shape): Symbol;
}
