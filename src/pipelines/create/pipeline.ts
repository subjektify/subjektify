import { BuildContext } from '../../types';
import { Log } from '../../util';
import { Pipeline } from '../../base';

export class CreatePipeline extends Pipeline  {

    execute(context: BuildContext): Promise<void> {

        Log.verbose('Build step completed. Running post processing...');
        return Promise.resolve();
    }
}
