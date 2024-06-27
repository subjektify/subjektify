import "subjektify/dist/types/config";

export type CodeGenTarget = "contract" | "client" | "server";

export type CodeGenLanguage = "typescript" | "javascript" | "solidity";

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
