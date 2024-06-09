import "subjektify/dist/types/config";
import "@subjektifylabs/subjektify-build/dist/type-extensions";

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
}

declare module "subjektify/dist/types/config" {

    export interface SubjektifyConfig {
        codegen?: CodeGenConfig[];
    }
}

/*declare module "@subjektifylabs/subjektify-build/dist/type-extensions" {

    export interface SubjektifyRuntimeEnvironment {
    }
}*/
