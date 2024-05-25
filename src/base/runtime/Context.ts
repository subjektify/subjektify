import path from 'path';
import fs from 'fs';
import { SubjektifyConfig, SubjektifyContext, SubjektifyRuntimeEnvironment } from "../../types";

export class Context implements SubjektifyContext {
    
    private static instance: Context;

    environment: SubjektifyRuntimeEnvironment;
    location: string;

    private constructor() {
        this.environment = {
            config: {} as SubjektifyConfig,
            artifacts: [],
            tasks: {},
            version: "0.0.1"
        };
        this.location = process.cwd();
    }

    public static getInstance(): Context {
        if (!Context.instance) {
            Context.instance = new Context();
        }
        return Context.instance;
    }

    public runtime(): SubjektifyRuntimeEnvironment {
        return this.environment;
    }

    public setRuntime(environment: SubjektifyRuntimeEnvironment): this {
        this.environment = environment;
        return this;
    }

    public async buildContext(): Promise<SubjektifyRuntimeEnvironment> {
        const config = await this.loadConfig();
        this.environment.config = config;
        return this.environment;
    }

    async loadConfig(): Promise<SubjektifyConfig> {
        const configPath = path.resolve(process.cwd(), 'subjektify.config');
        const jsPath = path.resolve(process.cwd(), 'subjektify.config.js');
        const tsPath = path.resolve(process.cwd(), 'subjektify.config.ts');

        if (fs.existsSync(jsPath) || fs.existsSync(tsPath)) {
            const config = await import(tsPath);
            return config; // Handle ES module default export
        } else {
            throw new Error('Subjektify\'s configuration file not found.');
        }
    }
}
