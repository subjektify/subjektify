import { SubjektModel } from "subjekt";
import "subjektify/dist/types/config";
import "subjektify/dist/types/runtime";

export interface CodeGenConfig {
    target: string;
}

declare module "subjektify/dist/types/config" {

    export interface SubjektifyConfig {
        codegen: string[];
    }
}

declare module "subjektify/dist/types/runtime" {

    export interface SubjektifyRuntimeEnvironment {
        model: SubjektModel;
    }
}
