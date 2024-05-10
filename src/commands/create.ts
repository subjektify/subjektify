import path from 'path';
import fs from 'fs';
import { Log, Shell } from '../util';
import { Command, CreateOptions } from "../types";

export class CreateCommand implements Command {
    
    run(command: string, namespace: string, options?: CreateOptions): Promise<void> {
        //const module = new CreateModule();
        
        // Resolve namespace path
        const projectPath = path.join(process.cwd(), namespace);
    
        // Return if namespace exists
        if (fs.existsSync(projectPath)) {
            Log.warn(`Namespace ${namespace} already created! Exiting...`);
            return Promise.resolve();
        }
    
        // Create the namespace as a plugin if specified
        if (options?.plugin) {
            //return module.pluginNamespace(namespace, projectPath);
        }
    
        // Either creates a namespace from a blueprint, or a default namespace to get started
        if (options?.blueprint) {
            //module.blueprintNamespace(namespace, projectPath, options.blueprint);
        } else {
            //module.defaultNamespace(namespace, projectPath);
        }
        Log.debug(`Created namespace directories, installing dependencies...`);
    
        // Install dependencies
        //Shell.execSync('npm install', projectPath);
    
        Log.success(`Created namespace "${namespace}" successfully! 🎉`);
        return Promise.resolve();
    }
}
