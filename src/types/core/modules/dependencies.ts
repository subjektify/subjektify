import { NamespaceImport } from "./imports";

export type DependencyRegistryKey = "npm" | "github";

export type Dependencies = {
    [key in DependencyRegistryKey]: NamespaceImport;
};
