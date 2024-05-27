import { SubjektifyContext } from '../../types';
import { SubjektModel } from 'subjekt';

export const mergeModels = (context: SubjektifyContext, models: SubjektModel[]): SubjektModel => {

    // Merge the models
    const mergedModel = models.reduce((mergedModel, model) => {
        return mergedModel;
    });

    return mergedModel;
}
