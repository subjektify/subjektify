import { CommandOptions } from "./command";
import { SubjektifyConfig } from "./";

export interface SubjektifyContext {
    command: CommandContext;
    config: SubjektifyConfig;
    namespacePath: string;
    package: PackageContext;
    results: Record<string, any>;
}

export interface CommandContext {
    task: string;
    options?: CommandOptions;
}

export interface PackageContext {
    json: Record<string, any>;
}
