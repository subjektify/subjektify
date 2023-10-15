import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { Log, Shell } from '../../../util';
import { SubjektifyConfig } from '../../../types';

export const createDefaultNamespace = (namespace: string, projectPath: string) => {

    // Resolve project related paths
    const configPath = path.join(projectPath, 'subjektify.json');
    const sourcesPath = path.join(projectPath, 'subjects');
    const subjektPath = path.join(sourcesPath, `${namespace}.subjekt`);
    const packageJsonPath = path.join(projectPath, 'package.json');

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

    // Create package.json
    const packageJson = {
        name: namespace,
        version: '0.0.1',
        description: 'My decentralized application built with Subjektify.',
        main: 'dist/index',
        scripts: {
            build: 'subjektify build',
            clean: 'subjektify clean',
            compile: 'subjektify compile',
            deploy: 'subjektify deploy',
            test: 'subjektify test'
        },
        keywords: [
            namespace,
            'decentralized',
            'application',
            'dapp',
            'subjekt'
        ],
        devDependencies: {
            "rimraf": "^3.0.2",
            "subjektify": "^0.0.1",
        }
    }

    // Write package.json
    const packageJsonSerialized = JSON.stringify(packageJson, null, 2);
    fs.writeFileSync(packageJsonPath, packageJsonSerialized);

    // Install dependencies
    Shell.execSync('npm install', projectPath);

    Log.success(`Created namespace "${namespace}" successfully! 🎉`);
}
