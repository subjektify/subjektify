import "subjektify/dist/types/config";

export interface WatchConfig {
    paths?: string[];
}

declare module "subjektify/dist/types/config" {

    export interface SubjektifyConfig {
        watch?: WatchConfig;
    }
}
