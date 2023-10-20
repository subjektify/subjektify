import { CommandOptions } from "../../command";
import { SubjektifyConfig } from "./";

export interface SubjektifyContext {
    command: CommandContext;
    config: SubjektifyConfig;
    namespacePath: string;
    results: Record<string, any>;
}

export interface CommandContext {
    target: string;
    options?: CommandOptions;
}
