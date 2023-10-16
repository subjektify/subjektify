import fs from 'fs';
import path from 'path';
import { PluginManager as LivePluginManager, PluginManagerOptions } from "live-plugin-manager";
import { Log } from '../../util';

export class PluginManagerAdapter {

    private static _instance: LivePluginManager;

    private constructor() {
    }

    public static instance(): LivePluginManager {
        if (!PluginManagerAdapter._instance) {
            PluginManagerAdapter._instance = new LivePluginManager();
        }
        return PluginManagerAdapter._instance;
    }
}
