import { NamespaceImport } from "./NamespaceImport";

export type DependencyRegistryKey = "npm" | "github";

export type Dependencies = {
    [key in DependencyRegistryKey]: NamespaceImport;
};
