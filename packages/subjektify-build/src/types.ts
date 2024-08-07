import { AstModel, SubjektModel } from "subjekt";
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

export interface ProjectionArtifact {
  ast: AstModel;
  semantic: SubjektModel;
}

export interface SubjektifyModel {
  ast: AstModel;
  semantic: SubjektModel;
  projections: Record<string, ProjectionArtifact>;
}

declare module "subjektify/dist/types/runtime" {
  export interface SubjektifyRuntimeEnvironment {
    model: SubjektifyModel;
  }
}
