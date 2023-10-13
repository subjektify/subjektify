import fs from 'fs';
import path from 'path';
import { Log } from '../../util';
import { SubjektifyConfig } from '../../types';

export const createDefaultNamespace = (namespace: string, projectPath: string) => {

    // Resolve project related paths
    const configPath = path.join(projectPath, 'subjektify.json');
    const sourcesPath = path.join(projectPath, 'subjects');
    const subjektPath = path.join(sourcesPath, `${namespace}.subjekt`);

    // Create directories
    fs.mkdirSync(projectPath);
    fs.mkdirSync(sourcesPath);
    
    // Create subjektify.json
    const subjektifyConfig: SubjektifyConfig = {
        namespace,
        version: "0.0.1",
        license: "MIT",
        sources: ["subjects"]
    }

    // Write subjektify.json
    const serialized = JSON.stringify(subjektifyConfig, null, 2);
    fs.writeFileSync(configPath, serialized);

    // Write {namespace}.subjekt
    fs.writeFileSync(subjektPath, `// This is the starting point for defining your decentralized application's subjects, contracts, and data structures.
`);

    Log.success(`Created namespace "${namespace}" successfully! 🎉`);
}
