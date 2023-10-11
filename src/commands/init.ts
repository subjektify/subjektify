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

/*
    // Create subjects directory
    const subjectsDirectory = path.join(process.cwd(), 'subjects');
    if (!fs.existsSync(subjectsDirectory)) {
        fs.mkdirSync(subjectsDirectory);
    }

    // Create <namespace>.subject
    const namespacePath = path.join(subjectsDirectory, `${namespace}.subject`)
    if (fs.existsSync(namespacePath)) {
        console.log(`Namespace ${namespace} already exists! Please choose a different name.`.red.bold);
        return;
    }

    console.log(`Initialized subject namespace "${namespace}" successfully! 🎉`.green.bold);*/
};
