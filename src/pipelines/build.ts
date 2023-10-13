import { Context } from '../types';
import { Log } from '../util';
import { Pipeline } from './';

export class BuildPipeline extends Pipeline  {

    execute(context: Context): void {
        Log.debug('Method not implemented.');
    }

}
