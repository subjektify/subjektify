import { ASTModel, SubjektModel } from "subjekt";
import { Projection, ProjectionArtifact } from "./types";

export class ProjectionApplier {

    private _projections: Projection[];

    constructor(projections: Projection[]) {
        this._projections = projections;
    }

    public apply(model: SubjektModel): Record<string, ProjectionArtifact> {
        return {};
    }

    public projectAstModel(model: ASTModel): Record<string, ASTModel> {
        return {};
    }

    public projectSubjektModel(model: SubjektModel): Record<string, SubjektModel> {
        return {};
    }
}
