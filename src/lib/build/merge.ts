import { Context } from '../../types';
import { Log } from '../../util';
import { SubjektModel } from 'subjekt';

export const mergeModels = (context: Context, models: SubjektModel[]): SubjektModel => {

    // Merge the models
    const mergedModel = models.reduce((mergedModel, model) => {
        mergedModel.prelude = Object.assign(mergedModel.prelude, model.prelude);
        return mergedModel;
    });

    Log.debug(`Merged models: ${mergedModel}`);

    return mergedModel;
}