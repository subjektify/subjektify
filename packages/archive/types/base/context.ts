import { CommandOptions, SubjektifyRuntimeEnvironment } from "./";

export interface SubjektifyContext {
    environment: SubjektifyRuntimeEnvironment;
    location: string;
}

export interface CommandContext {
    task: string;
    options?: CommandOptions;
}
