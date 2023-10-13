import fs from 'fs';
import path from 'path';
import { Log } from '../util';
import { SubjektifyConfig } from '../types';

export const initCommand = (namespace: string) => {
    
    // Resolve config path
    const projectPath = process.cwd();
    const configPath = path.join(projectPath, 'subjektify.json');

    // Fail if subjektify.json exists
    if (fs.existsSync(configPath)) {
        Log.warn(`Namespace already initialized! Exiting...`);
        return;
    }

    // Create subjektify.json
    const subjektifyConfig: SubjektifyConfig = {
        namespace,
        version: "0.0.1",
        license: "MIT"
    }

    // Write subjektify.json
    const serialized = JSON.stringify(subjektifyConfig, null, 2);
    fs.writeFileSync(configPath, serialized);

    Log.success(`Initialized namespace "${namespace}" successfully! 🎉`);
};
