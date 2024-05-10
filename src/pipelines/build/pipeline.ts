import { BuildContext } from '../../types';
import { Log } from '../../util';
import { Pipeline } from '../../base';
import { applyProjections, mergeModels, parseSources } from './';

export class BuildPipeline extends Pipeline  {

    execute(context: BuildContext): Promise<void> {

        // Parse the subjekt model
        const models = parseSources(context);

        // Merge the models
        const mergedModel = mergeModels(context, models);

        // Apply projections
        const projectedModels = applyProjections(context, mergedModel);

        // Store the results in the context
        context.model = mergedModel;
        context.projections = projectedModels;

        Log.verbose('Build step completed. Running post processing...');
        return Promise.resolve();
    }
}
