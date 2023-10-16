import { execSync } from 'child_process';
import { Log } from './Log';

export class Shell {
    static execSync(command: string, cwd: string): void {
        try {
            execSync(command, {
                cwd,
                stdio: 'inherit'
            });
        } catch (error) {
            Log.error('Failed to install dependencies.');
            process.exit(1);
        }
    }
}
