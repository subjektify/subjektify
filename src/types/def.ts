import { SubjektifyConfig } from "./SubjektifyConfig";

export type CommandTarget = "build" | "clean" | "compile" | "create" | "deploy" | "publish" | "run" | "start" | "test";

/**
 * Command interface that all command classes should implement.
 */
export interface Command {
    run(): void;
}

/**
 * Context type that holds the configuration and any other data that needs to be shared across the pipeline.
 */
export type Context = {
    commandTarget: CommandTarget;
    config: SubjektifyConfig;
    namespacePath: string;
    results: Record<string, any>;
}
