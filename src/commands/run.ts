import { Command, CommandOptions } from "../types";
import { Log } from "../util";

export class RunCommand implements Command {

    run(command: string, name: string, options?: CommandOptions): Promise<void> {
        Log.info(`Running command: ${command}`);
        Log.info(`Name: ${name}`);
        Log.debug(`Options: ${JSON.stringify(options)}`);
        return Promise.resolve();
    }
}
