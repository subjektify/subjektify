import { BuildOptions, Command } from "../types";
import { Log } from "../util";

export class BuildCommand implements Command {

    async run(options?: BuildOptions): Promise<void> {
        Log.info('Building namespace...');
    }
}
