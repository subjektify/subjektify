import path from 'path';
import fs from 'fs';
import { Log, Prompt } from '../util';
import { Command, CreateOptions } from "../types";

export class CreateCommand implements Command {
    
    async run(command: string, namespace?: string, options?: CreateOptions): Promise<void> {
        // Prompt for namespace if not provided
        if (!namespace) {
            namespace = await Prompt.input('Choose a namespace for your project:');
        }

        Log.info(`Creating namespace "${namespace}"...`);

        //const module = new CreateModule();
        
        // Resolve namespace path
        //const projectPath = path.join(process.cwd(), namespace);
    
        // Return if namespace exists
        //if (fs.existsSync(projectPath)) {
        //    Log.warn(`Namespace ${namespace} already exists! Exiting...`);
        //    return Promise.resolve();
        //}
    
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
