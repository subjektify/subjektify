import { SubjektifyContext } from ".";

/**
 * Interface for Subjektify plugins.
 */
export interface IPlugin {

    /**
     * Target command to run the plugin.
     */
    target(): string;

    /**
     * Function called to run the plugin.
     */
    run(context: SubjektifyContext): Promise<void>;
}

export type PluginRegistry = "local" | "npm" | "github";

export type PluginDependency = {
    registry: PluginRegistry;
    name?: string;
    version?: string;
    location?: string;
    force?: boolean;
}

/**
 * Interface for Subjektify plugins.
 */
export interface SubjektifyPlugin {
    
    /**
     * Name of the plugin.
     */
    name: string;

    /**
     * Enable the plugin. Default is true.
     */
    enabled?: boolean;

    /**
     * Output directory for the plugin. Default is the plugin name.
     */
    output?: string;

    /**
     * Configurations to pass to the plugin.
     */
    config?: Record<string, any>;

    /**
     * Register a plugin from external registries.
     */
    dependency?: PluginDependency;
}
