import { SubjektifyContext } from '../../../types';
import { Log } from '../../util';
import { Pipeline } from '../../modules';
import { applyProjections, mergeModels, parseSources } from './';

export class BuildPipeline extends Pipeline  {

    execute(context: SubjektifyContext): Promise<void> {

        // Parse the subjekt model
        const models = parseSources(context);

        // Merge the models
        const mergedModel = mergeModels(context, models);

        // Apply projections
        const projectedModels = applyProjections(context, mergedModel);

        // Store the results in the context
        context.results['models'] = projectedModels;

        Log.verbose('Build step completed. Running post processing...');
        return Promise.resolve();
    }
}
