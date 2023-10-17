import path from 'path';
import { PluginManager as LivePluginManager } from "live-plugin-manager";

export class PluginManagerAdapter {

    private static _instance: LivePluginManager;

    private constructor() {
    }

    public static instance(): LivePluginManager {
        if (!PluginManagerAdapter._instance) {
            PluginManagerAdapter._instance = new LivePluginManager({
                pluginsPath: path.resolve('./.subjektify/deps'),
            });
        }
        return PluginManagerAdapter._instance;
    }
}
