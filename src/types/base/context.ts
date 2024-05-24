import { CommandOptions, SubjektifyRuntimeEnvironment } from "./";

export interface SubjektifyContext {
    command: CommandContext;
    environment: SubjektifyRuntimeEnvironment;
    location: string;
}

export interface CommandContext {
    task: string;
    options?: CommandOptions;
}
