import { SubjektModel } from "subjekt";

export const mergeModels = (models: SubjektModel[]): SubjektModel => {
    // Merge the models
    const mergedModel = models.reduce((mergedModel, model) => {
        return mergedModel;
    });

    return mergedModel;
}
