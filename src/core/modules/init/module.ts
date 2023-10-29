import path from 'path';
import { FS, Log } from '../../util';

export class InitModule {

    public init(namespace: string) {
        const configPath = path.join(__dirname, '../../..', 'templates', 'default', 'subjektify.json');
        const targetPath = path.join(process.cwd(), 'subjektify.json');
        FS.copyFileSync(configPath, targetPath, namespace);
        Log.success(`Initialized namespace "${namespace}" successfully! 🎉`);
    }
}