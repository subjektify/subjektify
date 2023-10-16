import { Context, IPlugin } from '../../types';
import { Log } from '../../util';

import { applyPluginsInContext } from './apply';
import { loadPluginsFromContext } from './load';

export class PluginManager {

    private static _instance: PluginManager;
    private plugins: IPlugin[];

    private constructor() {
        this.plugins = [];
    }

    public static instance(): PluginManager {
        if (!PluginManager._instance) {
            PluginManager._instance = new PluginManager();
        }
        return PluginManager._instance;
    }

    public async loadPlugins(context: Context): Promise<void> {
        this.plugins = await loadPluginsFromContext(context);
    }

    public async applyPlugins(context: Context): Promise<void> {
        applyPluginsInContext(this.plugins, context);
    }
}
