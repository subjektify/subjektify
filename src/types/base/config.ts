import {
    Repository,
    SubjektifyProjection
} from "./";

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
    license: string;

    /**
     * Optional: Author of the namespace.
     */
    author?: string;

    /**
     * Optional: Flag to indicate if the namespace should be considered as a blueprint.
     */
    blueprint?: boolean;

    /**
     * Optional: Array of files to be included in the namespace.
     */
    files?: string[];

    /**
     * Optional: Array of tags for the namespace.
     */
    tags?: string[];

    /**
     * Optional: Flag to indicate if the namespace should be considered as a plugin.
     */
    plugin?: boolean;

    /**
     * Optional: You can override the default commands here.
     */
    scripts?: Record<string, string>;

    /**
     * Optional: Array of source file paths.
     */
    sources?: string[];

    /**
     * Optional: Projections to be applied.
     */
    projections?: SubjektifyProjection[];

    /**
     * Optional: Repository information.
     */
    repository?: Repository;
}
