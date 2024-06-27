import fs from "fs";
import path from "path";
import { SubjektModel } from "subjekt";
import { CodeGenConfig } from "../../types";
import { Eta } from "eta";

export abstract class CodeGenerator {
    config: CodeGenConfig;
    eta: Eta;

    constructor(config: CodeGenConfig) {
        this.config = config;
        this.eta = new Eta({ views: this.templatesDirectory() });
    }

    abstract generate(model: SubjektModel): Promise<void>;
    abstract extension(): string;

    templates(): string[] {
        return fs.readdirSync(this.templatesDirectory())
            .filter(file => file.endsWith('.eta'))
            .map(file => this.name(file));
    }

    templatesDirectory(): string {
        return path.resolve(
            __dirname, 
            '..', '..', '..', '..', 
            `templates`, 
            this.config.target, 
            this.config.language
        );
    }

    name(file: string): string {
        return path.basename(file, path.extname(file));
    }

    outputDirectory(): string {
        return this.config.outputDirectory ? 
            path.resolve(process.cwd(), this.config.outputDirectory) : 
            path.resolve(process.cwd(), this.config.target, this.config.version || 'latest');
    }

    write(outputPath: string, outputContent: string) {
        fs.writeFileSync(outputPath, outputContent);
    }
}
