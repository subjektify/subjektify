import fs from 'fs';
import path from 'path';
import { CreateModule, Log } from '../core';
import { CommandOptions } from "../types";

export interface CreateOptions extends CommandOptions {
    blueprint?: string;
    plugin?: boolean;
}

export const createCommand = (namespace: string, options?: CreateOptions) => {

    const module = new CreateModule();
    
    // Resolve namespace path
    const projectPath = path.join(process.cwd(), namespace);

    // Return if namespace exists
    if (fs.existsSync(projectPath)) {
        Log.warn(`Namespace ${namespace} already created! Exiting...`);
        return;
    }

    // Create the namespace as a plugin if specified
    if (options?.plugin) {
        return module.pluginNamespace(namespace, projectPath);
    }

    // Either creates a namespace from a blueprint, or a default namespace to get started
    if (options?.blueprint) {
        module.blueprintNamespace(namespace, projectPath, options.blueprint);
    } else {
        module.defaultNamespace(namespace, projectPath);
    }
}
