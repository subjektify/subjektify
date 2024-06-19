import { ASTModel, SubjektModel } from "subjekt";

export class SubjektifyMerger {

    public mergeAstModels(models: ASTModel[]): ASTModel {
        return models.reduce((mergedModel, model) => {
            return mergedModel;
        });
    }

    public mergeSubjektModels(models: SubjektModel[]): SubjektModel {
        return models.reduce((mergedModel, model) => {
            return mergedModel;
        });
    }
}
