import { SymbolDependency } from "./dependency";
import { SymbolReference } from "./reference";

export class Symbol {
    public readonly namespace: string;
    public readonly name: string;
    public readonly definitionFile: string;
    public readonly dependencies: SymbolDependency[];
    public readonly references: SymbolReference[];
    public properties: Map<string, any>;

    constructor(namespace: string, name: string, definitionFile: string, dependencies: SymbolDependency[], references: SymbolReference[]) {
        this.namespace = namespace;
        this.name = name;
        this.definitionFile = definitionFile;
        this.dependencies = dependencies;
        this.references = references;
        this.properties = new Map<string, any>();
    }

    public addProperty(name: string, value: any) {
        this.properties.set(name, value);
    }

    public getProperty(name: string): any {
        return this.properties.get(name);
    }
}
