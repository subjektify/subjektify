// Enum for default registries
export enum DefaultRegistries {
    NPM = 'npm',
    Blueprints = 'blueprints',
}

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

// Type for custom plugins
type CustomPlugin = string;

// Type for all possible plugins
type PluginName = DefaultBuildPlugins | CustomPlugin;

// Type for custom registries
type CustomRegistry = string;

// Type for all possible registries
type RegistryName = DefaultRegistries | CustomRegistry;

export interface SubjektifyImport {
    name: string;
    version: string; // Using Semantic Versioning (semver)
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
    license: string; // SPDX license identifier for the namespace
    author?: string; // Namespace author
    sources?: string[]; // Source file paths
    imports?: Map<RegistryName, SubjektifyImport[]>; // Imports from various registries
    plugins?: SubjektifyPlugin[]; // Plugins for code generation and other tasks
    projections?: SubjektifyProjection[]; // Optional projections to be applied
}
