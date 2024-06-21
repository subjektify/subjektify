import "subjektify/dist/types/config";

export interface CleanConfig {
    paths?: string[];
}

declare module "subjektify/dist/types/config" {

    export interface SubjektifyConfig {
        clean?: CleanConfig;
    }
}
