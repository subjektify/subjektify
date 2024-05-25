import { SubjektifyContext, IPlugin } from '../../types';
import { Log } from '../../util';

export class PluginRunner {

    constructor() {
    }

    runPlugins(plugins: IPlugin[], context: SubjektifyContext): Promise<void> {
        return this.runPluginsInContext(plugins, context);
    }

    private async runPluginsInContext(plugins: IPlugin[], context: SubjektifyContext): Promise<void> {
        await Promise.all(plugins.map(async plugin => {
            await this.runPlugin(plugin, context);
        }));
    }

    private async runPlugin(plugin: IPlugin, context: SubjektifyContext): Promise<void> {
        const target = plugin.target();
        const run = plugin.run;
        /*if (context.command.task === target) {
            await run(context);
            Log.verbose(`Plugin "${plugin.constructor.name}" executed successfully.`);
        } else {
            Log.verbose(`Plugin target "${target}" does not match command target "${context.command.task}". Skipping plugin.`);
        }*/
    }
}
