import { SubjektifyConfig } from "./SubjektifyConfig";

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
    config: SubjektifyConfig;
    namespacePath: string;
    results: Record<string, any>;
}

export type PluginTarget = "build" | "clean" | "compile" | "create" | "deploy" | "publish" | "run" | "start" | "test";

/**
 * Interface for Subjektify plugins.
 */
export interface IPlugin {

    /**
     * Target command to run the plugin.
     */
    target: PluginTarget;

    /**
     * Function called to run the plugin.
     */
    apply(context: Context): void;
}
