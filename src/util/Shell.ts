import { execSync } from 'child_process';
import { Log } from './Log';

export class Shell {
    static execSync(command: string, cwd: string): void {
        try {
            execSync(command, {
                cwd,
                stdio: 'inherit'
            });
        } catch (error: unknown) {
            const errorMessage = (error as Error).message;
            Log.error(errorMessage);
            process.exit(1);
        }
    }
}
