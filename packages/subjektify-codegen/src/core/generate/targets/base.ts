import fs from "fs";
import path from "path";
import { CodeGenConfig } from "../../types";
import { Eta } from "eta";
import { SubjektifyModel } from "@subjektifylabs/subjektify-build/dist/core/types";
import { SubjektifyConfig } from "subjektify";

export abstract class CodeGenerator {
    config: CodeGenConfig;
    subjektifyConfig: SubjektifyConfig;
    eta: Eta;

    constructor(config: CodeGenConfig, subjektifyConfig: SubjektifyConfig) {
        this.config = config;
        this.subjektifyConfig = subjektifyConfig;
        this.eta = new Eta({ views: this.templatesDirectory() });
    }

    abstract generate(model: SubjektifyModel): Promise<void>;
    abstract extension(): string;

    createOutputDirectory(): string {
        if (!fs.existsSync(this.outputDirectory())) {
            fs.mkdirSync(this.outputDirectory(), { recursive: true });
        }
        return this.outputDirectory();
    }

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
