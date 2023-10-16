export type PluginRegistry = "local" | "npm" | "github";

export type PluginDependency = {
    registry: PluginRegistry;
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
     * Register a local plugin by passing the path to the plugin.
     */
    dependency?: PluginDependency;
}
