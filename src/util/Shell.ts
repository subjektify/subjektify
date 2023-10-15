import { execSync } from 'child_process';
import { Log } from './Log';

export class Shell {
    static execSync(command: string, cwd: string): string {
        try {
            const result = execSync(command, {
                cwd,
                stdio: 'inherit'
            });
            return result.toString();
        } catch (error) {
            Log.error('Failed to install dependencies.');
            process.exit(1);
        }
    }
}
