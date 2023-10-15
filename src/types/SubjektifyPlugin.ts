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
    outputDirectory?: string;

    /**
     * Options to pass to the plugin.
     */
    options?: Record<string, any>;

    /**
     * Register a local plugin by passing the path to the plugin.
     */
    handler?: string;
}
