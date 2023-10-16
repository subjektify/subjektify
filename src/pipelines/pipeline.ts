import fs from 'fs';
import path from 'path';
import { Log } from '../util';
import { Command, CommandTarget, Context, SubjektifyConfig } from '../types';
import { PluginManager } from '../lib/plugins';

/**
 * Abstract Pipeline class that provides the skeleton for executing a series of operations.
 * It uses the Template Method design pattern.
 */
export abstract class Pipeline implements Command {

    /**
     * Entry point for running the pipeline.
     */
    public run(): void {
        try {
            const context = this.buildContext();
            this.preProcess(context);
            this.execute(context);
            this.postProcess(context);
        } catch(e) {
            Log.error((e as Error).message);
        }
    }

    /**
     * Abstract method for defining the target of the pipeline.
     * This needs to be implemented by each subclass.
     * @returns The target of the pipeline.
     */
    abstract target(): CommandTarget;

    /**
     * Abstract method for the main execution steps.
     * This needs to be implemented by each subclass.
     * @param context The context data.
     */
    abstract execute(context: Context): void;

    /**
     * Builds the context that will be passed through the pipeline.
     * @returns The built context.
     */
    private buildContext(): Context {

        const results = {};
        const commandTarget = this.target();

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

        return {
            commandTarget,
            config,
            namespacePath,
            results
        }
    }

    /**
     * Concrete method for preprocessing steps.
     * @param context The context data.
     */
    private preProcess(context: Context): void {
        // TODO: Add any preprocessing logic here.
        // Validate config
        // Load plugins
        PluginManager.instance().loadPlugins(context);
    }

    /**
     * Concrete method for postprocessing steps.
     * @param context The context data.
     */
    private postProcess(context: Context): void {
        // TODO: Add any postprocessing logic here.
        // Run plugins
        PluginManager.instance().applyPlugins(context);
    }
}
