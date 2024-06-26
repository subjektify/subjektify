/**
 * Namespace configuration interface for Subjektify.
 * This schema defines the subjektify.config.(js|ts) file within a project.
 */
export interface SubjektifyConfig {
    /**
     * Namespace for all subjects and shapes.
     */
    namespace: string;

    /**
     * Version of the namespace, following Semantic Versioning (semver).
     */
    version: string;

    /**
     * SPDX license identifier for the namespace.
     */
    license?: string;

    /**
     * Author of the namespace.
     */
    author?: string;

    /**
     * Homepage URL for the namespace.
     */
    homepage?: string;

    /**
     * Description of the namespace.
     */
    description?: string;

    /**
     * Keywords for the namespace.
     */
    keywords?: string[];
}

/**
 * Configuration extensions for Subjektify.
 */
export type ConfigExtender = (config: SubjektifyConfig) => void;
