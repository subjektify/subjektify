//import { SubjektModel } from "subjekt";
import { CodeGenerator } from "../generator";
import { SubjektifyRuntimeEnvironment } from "subjektify";

export class CodeGenEngine {
    private generators: Map<string, CodeGenerator>;
    private sre: SubjektifyRuntimeEnvironment;

    constructor(sre: SubjektifyRuntimeEnvironment) {
        this.generators = new Map();
        this.sre = sre;
        this._load();
    }

    generate(): Promise<void> {
        const generators = this.generators.values();
        const promises = Array.from(generators).map((generator) => generator.run());
        return Promise.all(promises).then(() => {});
    }

    private _load() {
    }

    private _register(target: string, language: string, generator: CodeGenerator): void {
        const key = this._key(target, language);
        this.generators.set(key, generator);
    }

    /*generate(target: string, language: string, model: SubjektModel): Promise<void> {
        const key = this.getKey(target, language);
        const generator = this.generators.get(key);
        if (!generator) {
            throw new Error(`No generator found for target ${target} and language ${language}`);
        }
        return generator.run();
    }*/

    private _key(target: string, language: string): string {
        return `${target}-${language}`;
    }
}
