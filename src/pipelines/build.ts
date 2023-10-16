import { CommandTarget, Context } from '../types';
import { Log } from '../util';
import { Pipeline } from './';
import { applyProjections, mergeModels, parseSources } from '../lib';

export class BuildPipeline extends Pipeline  {

    target(): CommandTarget {
        return "build";
    }

    execute(context: Context): Promise<void> {

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
