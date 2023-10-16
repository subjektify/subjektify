import fs from 'fs';
import path from 'path';
import { Context, IPlugin, SubjektifyPlugin } from '../../types';
import { Log } from '../../util';
import { PluginManagerAdapter } from './adapter';

export const loadPluginsFromContext = async (context: Context): Promise<IPlugin[]> => {
    Log.verbose(`Loading plugins...`);
    const configuredPlugins = context.config.plugins || [];
    const plugins: IPlugin[] = [];

    await Promise.all(configuredPlugins.map(async plugin => {
        const loadedPlugins = await loadPlugin(plugin, context);
        plugins.push(...loadedPlugins);
    }));

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

/**
 * Load Plugins from dependencies
 */
export const loadPluginFromDependency = async (plugin: SubjektifyPlugin, context: Context): Promise<IPlugin[]> => {
    if (!plugin.dependency) {
        return [];
    }
    const registry = plugin.dependency.registry;
    Log.verbose(`Loading plugin "${plugin.name}" from "${registry}"...`);
    const manager = PluginManagerAdapter.instance();
    await installPlugin(plugin);
    const dependency = manager.require(plugin.name);
    const result = await dependency.plugins();
    console.log(result);
    return result;
}

export const installPlugin = async (plugin: SubjektifyPlugin): Promise<void> => {
    const manager = PluginManagerAdapter.instance();
    const registry = plugin.dependency?.registry;
    switch (registry) {
        case "npm":
            await manager.installFromNpm(plugin.name);
            return Promise.resolve();
        case "github":
            await manager.installFromGithub(plugin.name);
            return Promise.resolve();
        case "local":
            const location = path.resolve(plugin.dependency?.location || "");
            if (!fs.existsSync(location)) {
                throw new Error(`Invalid location specified for local plugin "${plugin.name}"`);
            }
            await manager.installFromPath(location, {
                force: true
            });
            return Promise.resolve();
        default:
            throw new Error(`Unknown registry "${registry}"`);
    }
}

/**
 * Load Plugins from the default registry
 */
export const loadPluginFromRegistry = (plugin: SubjektifyPlugin, context: Context): IPlugin[] => {
    Log.verbose(`Loading plugin "${plugin.name}" from Subjektify's registry...`);
    return [];
}
