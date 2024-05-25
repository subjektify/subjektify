import { Context } from "../base";
import { Command, CommandOptions } from "../types";
import { Log } from "../util";

export class RunCommand implements Command {

    run(name: string, options?: CommandOptions): Promise<void> {

        return Context.getInstance().buildContext().then((runtime) => {
            const tasks = runtime.tasks || {};
            const task = tasks[name];

            
            Log.debug(`Runtime: ${JSON.stringify(runtime.config)}`);
            if (!task) {
                Log.error(`Task "${name}" not found`);
                return Promise.resolve();
            }
    
            Log.info(`Running task: ${name}`);
            Log.debug(`Options: ${JSON.stringify(options)}`);
            return Promise.resolve();
        });
    }
}
