import { Context, IPlugin } from '../../types';
import { Log } from '../../util';

import { PluginRunner } from './run';
import { PluginLoader } from './load';

export class PluginManager {

    private static _instance: PluginManager;
    private plugins: IPlugin[];
    private loader: PluginLoader;
    private runner: PluginRunner;

    private constructor() {
        this.plugins = [];
        this.loader = new PluginLoader();
        this.runner = new PluginRunner();
    }

    public static instance(): PluginManager {
        if (!PluginManager._instance) {
            PluginManager._instance = new PluginManager();
        }
        return PluginManager._instance;
    }

    public async loadPlugins(context: Context): Promise<void> {
        this.plugins = await this.loader.loadPlugins(context);
    }

    public async runPlugins(context: Context): Promise<void> {
        return this.runner.runPlugins(this.plugins, context);
    }
}
