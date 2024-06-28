import { CodeGenerator } from "../generate/targets";
import { TypescriptTranspiler } from "./typescript";

export class TranspilerFactory {
    static transpiler(generator: CodeGenerator) {
        return new TypescriptTranspiler(generator);
    }
}