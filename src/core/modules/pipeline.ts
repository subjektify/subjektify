import fs from 'fs';
import path from 'path';
import { Log } from '../util';
import { Command, SubjektifyContext, SubjektifyConfig, CommandOptions, PackageContext } from '../../types';
import { PluginManager } from './plugin';
import { Pack } from 'tar';

/**
 * Abstract Pipeline class that provides the skeleton for executing a series of operations.
 * It uses the Template Method design pattern.
 */
export abstract class Pipeline implements Command {

    /**
     * Entry point for running the pipeline.
     */
    public async run(name: string, options?: CommandOptions): Promise<void> {
        try {
            const context = this.buildContext(name, options);
            await this.preProcess(context);
            await this.execute(context);
            await this.postProcess(context);
        } catch(e) {
            Log.error((e as Error).message);
        }
    }

    /**
     * Abstract method for the main execution steps.
     * This needs to be implemented by each subclass.
     * @param context The context data.
     */
    abstract execute(context: SubjektifyContext): Promise<void>;

    /**
     * Builds the context that will be passed through the pipeline.
     * @returns The built context.
     */
    private buildContext(name: string, options?: CommandOptions): SubjektifyContext {

        const results = {};
        const command = {
            target: name,
            options
        };

        // Resolve config path
        const namespacePath = process.cwd();
        const configPath = path.join(namespacePath, 'subjektify.json');
    
        // Fail if subjektify.json doesn't exists
        if (!fs.existsSync(configPath)) {
            throw new Error(`Namespace not initialized! Either 'init' or 'create' a namespace and try again...`);
        }

        // Read subjektify.json
        const serialized = fs.readFileSync(configPath, 'utf-8');
        const config: SubjektifyConfig = JSON.parse(serialized);

        // Read package.json
        const packagePath = path.join(namespacePath, 'package.json');
        const packageSerialized = fs.readFileSync(packagePath, 'utf-8');
        const packageJson = JSON.parse(packageSerialized);
        const packageContext: PackageContext = {
            json: packageJson
        };

        return {
            command,
            config,
            package: packageContext,
            namespacePath,
            results
        }
    }

    /**
     * Concrete method for preprocessing steps.
     * @param context The context data.
     */
    private async preProcess(context: SubjektifyContext): Promise<void> {
        // TODO: Add any preprocessing logic here.
        // Validate config
        // Load plugins
        await PluginManager.instance().loadPlugins(context);
    }

    /**
     * Concrete method for postprocessing steps.
     * @param context The context data.
     */
    private async postProcess(context: SubjektifyContext): Promise<void> {
        // TODO: Add any postprocessing logic here.
        // Run plugins
        await PluginManager.instance().runPlugins(context);
    }
}
