import path from 'path';
import { InitContext } from '../../types';
import { Log } from '../../util';
import { Pipeline } from '../../base';

export class InitPipeline extends Pipeline  {

    execute(context: InitContext): Promise<void> {

        const namespace = context.namespace;

        const configPath = path.join(__dirname, '../../..', 'templates', 'default', 'subjektify.json');
        const targetPath = path.join(process.cwd(), 'subjektify.json');
        
        //FS.copyFileSync(configPath, targetPath, namespace);

        Log.success(`Initialized namespace "${namespace}" successfully! 🎉`);
        return Promise.resolve();
    }
}
