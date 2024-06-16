import "subjektify/dist/types/config";

export enum CodeGenTarget {
    Contract = "contract",
    Client = "client",
    Server = "server",
}

export enum CodeGenLanguage {
    TypeScript = "typescript",
    JavaScript = "javascript",
    Solidity = "solidity"
}

export interface CodeGenConfig {
    target: CodeGenTarget;
    language: CodeGenLanguage;
    outputDirectory?: string;
    version?: string;
}

declare module "subjektify/dist/types/config" {

    export interface SubjektifyConfig {
        codegen?: CodeGenConfig[];
    }
}
