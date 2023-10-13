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
};
