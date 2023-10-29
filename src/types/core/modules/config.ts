import {
    Dependencies,
    NamespaceImport,
    Repository,
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
     * Optional: Array of files to be included in the namespace.
     */
    files?: string[];

    /**
     * Optional: Array of keywords for the namespace.
     */
    keywords?: string[];

    /**
     * Optional: Flag to indicate if the namespace should be considered as a plugin.
     */
    plugin?: true;

    /**
     * Optional: You can override the default commands here.
     */
    scripts?: Record<string, string>;

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
     * Optional: Repository information.
     */
    repository?: Repository;

    /**
     * Optional: Imports namespaces from npm packages.
     */
    dependencies?: Dependencies;
}
