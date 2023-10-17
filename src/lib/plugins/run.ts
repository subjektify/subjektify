import { Context, IPlugin } from '../../types';
import { Log } from '../../util';

export class PluginRunner {

    constructor() {
    }

    runPlugins(plugins: IPlugin[], context: Context): Promise<void> {
        return this.runPluginsInContext(plugins, context);
    }

    private async runPluginsInContext(plugins: IPlugin[], context: Context): Promise<void> {
        await Promise.all(plugins.map(async plugin => {
            await this.runPlugin(plugin, context);
        }));
    }

    private async runPlugin(plugin: IPlugin, context: Context): Promise<void> {
        const target = plugin.target();
        const run = plugin.run;
        if (context.commandTarget === target) {
            await run(context);
            Log.verbose(`Plugin "${plugin.constructor.name}" executed successfully.`);
        } else {
            Log.verbose(`Plugin target "${target}" does not match command target "${context.commandTarget}". Skipping plugin.`);
        }
    }
}
