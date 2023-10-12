// Enum for default plugins
export enum DefaultBuildPlugins {
    AST = 'ast',
    Java = 'java',
    JavaScript = 'javascript',
    Python = 'python',
    Solidity = 'solidity',
    Swift = 'swift',
    TypeScript = 'typescript',
}

export type SPDXLicense = string;

// Type for custom plugins
export type CustomPlugin = string;

// Type for all possible plugins
export type PluginName = DefaultBuildPlugins | CustomPlugin;

export interface NamespaceImport {
    [key: string]: string; // namespace name : version
}

export interface SubjektifyPlugin {
    name: PluginName;
}

export interface SubjektifyProjection {
    name: string;
}

export interface SubjektifyConfig {
    namespace: string; // Namespace for all subjects and shapes
    version: string; // Version of the namespace following semver
    license: SPDXLicense; // SPDX license identifier for the namespace
    author?: string; // Namespace author
    blueprint?: boolean; // Sets the namespace to be considered as a blueprint
    sources?: string[]; // Source file paths
    imports?: NamespaceImport; // Imports namespaces from blueprints
    plugins?: SubjektifyPlugin[]; // Plugins for code generation and other tasks
    projections?: SubjektifyProjection[]; // Optional projections to be applied
    npm?: NamespaceImport; // Imports namespaces from npm
}
