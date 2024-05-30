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
     * List of relative files or directories that contain Subjekt models.
     */
    sources?: string[];

    /**
     * The location where project artifacts will be written.
     */
    outputDirectory?: string;

    /**
     * A map of projections to be applied to the Subjekt model.
     */
    projections?: Map<string, string>;
}
