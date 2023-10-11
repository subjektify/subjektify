import 'colorts/lib/string';
import fs from 'fs';
import path from 'path';
import { SubjektifyConfig } from '../types';

interface InitOptions {
    blueprint?: string;
}

export const initCommand = (namespace: string, options: InitOptions) => {
    
    const projectDirectory = process.cwd();
    const configPath = path.join(projectDirectory, 'subjektify.json');

    // Fail if subjektify.json exists
    if (fs.existsSync(configPath)) {
        console.log(`Namespace already initialized! Exiting...`.yellow.bold);
        return;
    }

    // Create subjektify.json
    const subjektifyConfig: SubjektifyConfig = {
        namespace,
        version: "0.0.1",
        license: "Apache-2.0"
    }
    const serialized = JSON.stringify(subjektifyConfig, null, 2);
    fs.writeFileSync(configPath, serialized);
    console.log(`Initialized subject namespace "${namespace}" successfully! 🎉`.green.bold);
};
