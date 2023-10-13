import fs from 'fs';
import path from 'path';
import { Log } from '../util';
import { Command, Context, SubjektifyConfig } from '../types';

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
        // Resolve config path
        const projectPath = process.cwd();
        const configPath = path.join(projectPath, 'subjektify.json');
    
        // Fail if subjektify.json doesn't exists
        if (!fs.existsSync(configPath)) {
            throw new Error(`Namespace not initialized! Either 'init' or 'create' a namespace and try again...`);
        }

        // Read subjektify.json
        const serialized = fs.readFileSync(configPath, 'utf-8');
        const config: SubjektifyConfig = JSON.parse(serialized);

        return {
            config
        }
    }

    /**
     * Concrete method for preprocessing steps.
     * @param context The context data.
     */
    private preProcess(context: Context): void {
        console.log(context);
        // TODO: Add any preprocessing logic here.
    }

    /**
     * Concrete method for postprocessing steps.
     * @param context The context data.
     */
    private postProcess(context: Context): void {
        console.log("Postprocessing...");
        // TODO: Add any postprocessing logic here.
    }
}