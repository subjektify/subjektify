import path from 'path';
import fs from 'fs';
import { Log, Prompt, Shell, Template, Templates } from '../util';
import { Command, CreateOptions } from "../types";

export class CreateCommand implements Command {

    async run(namespace?: string, options?: CreateOptions): Promise<void> {

        // Prompt for namespace if not provided
        while (!namespace) {
            namespace = await Prompt.input('Choose a namespace for your project:');
        }

        Log.info(`Creating namespace "${namespace}"...`);

        // Resolve namespace path
        const projectPath = path.join(process.cwd(), namespace);

        // Exit if directory exists
        this.exists(projectPath);

        // Either creates a namespace from a blueprint
        if (options?.blueprint) {
            this.blueprintNamespace(namespace, projectPath, options.blueprint);
        }
        // Or creates an empty namespace
        else {
            this.defaultNamespace(namespace, projectPath);
        }

        await this.installDependencies(projectPath);

        Log.success(`Created namespace "${namespace}" successfully! 🎉`);
        return Promise.resolve();
    }

    exists(location: string): void {
        if (fs.existsSync(location)) {
            Log.error(`Directory "${location}" already exists! Exiting...`);
            process.exit(1);
        }
    }

    blueprintNamespace(namespace: string, projectPath: string, blueprint: string): Promise<void> {
        if (Object.values(Templates).includes(blueprint as Templates)) {
            Template.copy(blueprint as Templates, projectPath, namespace);
        } else {
            Log.error(`Blueprint "${blueprint}" not found!`);
            process.exit(1);
        }
        return Promise.resolve();
    }

    defaultNamespace(namespace: string, projectPath: string): Promise<void> {
        Template.copy(Templates.DEFAULT, projectPath, namespace);
        return Promise.resolve();
    }

    async installDependencies(projectPath: string): Promise<void> {
        const install = await Prompt.confirm('Would you like to install the dependencies now?');
        if (install) {
            Log.info('Installing dependencies...');
            Shell.execSync('npm install', projectPath);
        } else {
            Log.info('Skipping dependency installation...');
        }
    }
}
