import { ASTModel, SubjektModel } from "subjekt";
import "subjektify/dist/types/config";
import "subjektify/dist/types/runtime";

export enum TransformationType {
    Apply = "apply",
    ExcludeByTrait = "excludeByTrait",
    ExcludeMetadata = "excludeMetadata",
    ExcludeTraits = "excludeTraits",
    IncludeByTrait = "includeByTrait",
    RenameShapes = "renameShapes",
}

export interface Transformation {
    type: TransformationType;
    args?: Record<string, any>;
}

export interface Projection {
    name: string;
    abstract?: boolean;
    imports?: string[];
    transformations?: Transformation[];
}

export interface BuildConfig {
    sources?: string[];
    outputDirectory?: string;
    includePrelude?: boolean;
    projections?: Projection[];
}

declare module "subjektify/dist/types/config" {

    export interface SubjektifyConfig {
        build?: BuildConfig;
    }
}

export interface SubjektifyModel {
    ast: ASTModel;
    semantic: SubjektModel;
    projections: Record<string, SubjektModel>;
}

declare module "subjektify/dist/types/runtime" {

    export interface SubjektifyRuntimeEnvironment {
        model: SubjektifyModel;
    }
}
