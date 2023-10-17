import fs from 'fs';
import path from 'path';
import { PluginManagerAdapter } from './adapter';
import { Context, IPlugin, SubjektifyPlugin } from '../../types';
import { Log } from '../../util';

export class PluginLoader {

    constructor() {
    }

    loadPlugins(context: Context): Promise<IPlugin[]> {
        return this.loadFromContext(context);
    }

    private async loadFromContext(context: Context): Promise<IPlugin[]> {
        Log.verbose(`Loading plugins from context...`);

        const contextPlugins = context.config.plugins || [];
        const plugins: IPlugin[] = [];

        await Promise.all(contextPlugins.map(async plugin => {
            const loadedPlugins = await this.loadPlugin(plugin);
            plugins.push(...loadedPlugins);
        }));

        return Promise.resolve(plugins);
    }

    private async loadPlugin(plugin: SubjektifyPlugin): Promise<IPlugin[]> {

        // Check if plugin is marked as enabled
        if (plugin.enabled === false) {
            Log.verbose(`Plugin "${plugin.name}" disabled. Skipping plugin.`);
            return [];
        }

        // Attempt to load the plugin from the dependency
        if (plugin.dependency) {
            return this.loadFromDependency(plugin);
        }

        // Default to look up the plugin in the plugin registry
        return this.loadFromRegistry(plugin);
    }

    private async loadFromDependency (plugin: SubjektifyPlugin): Promise<IPlugin[]> {

        // Install the plugin
        await this.installPlugin(plugin);

        // Load the plugins method. Each plugin should export a plugins method that returns an array of IPlugin interface.
        const manager = PluginManagerAdapter.instance();
        const dependency = manager.require(plugin.name);
        const loader = dependency.plugins;
        const result = loader?.() || [];

        return result;
    }

    private async loadFromRegistry (plugin: SubjektifyPlugin): Promise<IPlugin[]> {
        Log.verbose(`Loading plugin "${plugin.name}" from Subjektify's registry...`);
        return Promise.resolve([]);
    }

    private async installPlugin (plugin: SubjektifyPlugin): Promise<void> {

        const manager = PluginManagerAdapter.instance();
        const registry = plugin.dependency?.registry || "npm";

        switch (registry) {
            case "npm":
                await manager.installFromNpm(plugin.name);
                break;
            case "github":
                await manager.installFromGithub(plugin.name);
                break;
            case "local":
                const location = path.resolve(plugin.dependency?.location || "");
                if (!fs.existsSync(location)) {
                    throw new Error(`Invalid location specified for local plugin "${plugin.name}"`);
                }
                await manager.installFromPath(location, {
                    force: true
                });
                break;
            default:
                throw new Error(`Unknown registry "${registry}"`);
        }

        return Promise.resolve();
    }
}
