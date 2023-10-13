import {
    NamespaceImport,
    SubjektifyPlugin,
    SubjektifyProjection
} from "./";

/**
 * Namespace configuration interface for Subjektify.
 * This schema defines the subjektify.json file within a project.
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
     * Optional: Array of source file paths.
     */
    sources?: string[];

    /**
     * Optional: Imports namespaces from blueprints.
     */
    imports?: NamespaceImport;

    /**
     * Optional: Plugins for code generation and other tasks.
     */
    plugins?: SubjektifyPlugin[];

    /**
     * Optional: Projections to be applied.
     */
    projections?: SubjektifyProjection[];

    /**
     * Optional: Imports namespaces from npm packages.
     */
    npm?: NamespaceImport;
}
