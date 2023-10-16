import { Context, IPlugin, SubjektifyPlugin } from '../../types';
import { Log } from '../../util';
import { PluginManagerAdapter } from './adapter';

export const loadPluginsFromContext = async (context: Context): Promise<IPlugin[]> => {
    Log.verbose(`Loading plugins...`);
    const configuredPlugins = context.config.plugins || [];
    const plugins: IPlugin[] = [];
    //const plugins: IPlugin[] = configuredPlugins.flatMap(async (plugin) => await loadPlugin(plugin, context));
    console.log(plugins);
    return plugins;
}

export const loadPlugin = async (plugin: SubjektifyPlugin, context: Context): Promise<IPlugin[]> => {

    // Check if plugin is marked as enabled
    if (plugin.enabled === false) {
        Log.debug(`Plugin "${plugin.name}" disabled. Skipping plugin.`);
        return [];
    }

    // Attempt to load the plugin from the dependency
    if (plugin.dependency) {
        return loadPluginFromDependency(plugin, context);
    }

    // Default to load the plugin exists in the plugin registry
    return loadPluginFromRegistry(plugin, context);

}

export const loadPluginFromDependency = async (plugin: SubjektifyPlugin, context: Context): Promise<IPlugin[]> => {
    if (!plugin.dependency) {
        return [];
    }
    const registry = plugin.dependency.registry;
    Log.verbose(`Loading plugin "${plugin.name}" from "${registry}"...`);
    const manager = PluginManagerAdapter.instance();
    await manager.install(plugin.name);
    const plugins = manager.require(plugin.name);
    return plugins;
}

export const loadPluginFromRegistry = (plugin: SubjektifyPlugin, context: Context): IPlugin[] => {
    Log.verbose(`Loading plugin "${plugin.name}" from Subjektify's registry...`);
    return [];
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