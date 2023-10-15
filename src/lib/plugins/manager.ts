import fs from 'fs';
import path from 'path';
import { PluginManager as LivePluginManager, PluginManagerOptions } from "live-plugin-manager";
import { Context, IPlugin } from '../../types';
import { Log } from '../../util';

export class PluginManager {

    private manager: LivePluginManager;
    private plugins: IPlugin[];

    constructor(private pluginDir: string) {
        this.manager = new LivePluginManager();
        this.plugins = [];
    }

    loadPlugins(): void {
    }

    /*loadPlugins(): void {
        const pluginFiles = fs.readdirSync(this.pluginDir)
            .filter(file => file.endsWith('.js'));

        for (const pluginFile of pluginFiles) {
            const pluginPath = path.join(this.pluginDir, pluginFile);
            const pluginModule = require(pluginPath);
            const plugin: SubjektifyPlugin = new pluginModule();
            this.plugins.push(plugin);
            Log.debug(`Loaded plugin: ${plugin.name}`);
        }
    }

    applyPlugins(context: Context): void {
        for (const plugin of this.plugins) {
            if (plugin.enabled) {
                Log.debug(`Applying plugin: ${plugin.name}`);
                //plugin.apply(context);
            }
        }
    }*/
}
