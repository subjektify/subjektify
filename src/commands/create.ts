import fs from 'fs';
import path from 'path';
import { Log } from '../util';
import { 
    createBlueprintNamespace, 
    createDefaultNamespace, 
    createPluginNamespace
} from '../lib';

interface CreateOptions {
    blueprint?: string;
    plugin?: boolean;
}

export const createCommand = (namespace: string, options: CreateOptions) => {
    
    // Resolve namespace path
    const projectPath = path.join(process.cwd(), namespace);

    // Return if namespace exists
    if (fs.existsSync(projectPath)) {
        Log.warn(`Namespace ${namespace} already created! Exiting...`);
        return;
    }

    // Create the namespace as a plugin if specified
    if (options?.plugin) {
        return createPluginNamespace(namespace, projectPath);
    }

    // Either creates a namespace from a blueprint, or a default namespace to get started
    if (options?.blueprint) {
        createBlueprintNamespace(namespace, options.blueprint);
    } else {
        createDefaultNamespace(namespace, projectPath);
    }
};
