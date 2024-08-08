import { AstModel, SubjektModel } from "subjekt";
import { Projection, ProjectionArtifact } from "../types";

export class ProjectionApplier {
  private _projections: Projection[];

  constructor(projections: Projection[]) {
    this._projections = projections;
  }

  public apply(model: SubjektModel): Record<string, ProjectionArtifact> {
    return {};
  }

  public projectAstModel(model: AstModel): Record<string, AstModel> {
    return {};
  }

  public projectSubjektModel(
    model: SubjektModel,
  ): Record<string, SubjektModel> {
    return {};
  }
}
