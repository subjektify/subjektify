import 'colorts/lib/string';
import fs from 'fs';
import path from 'path';

interface InitOptions {
    blueprint?: string;
}

export const initCommand = (namespace: string, options: InitOptions) => {
    console.log(namespace);
    console.log(options);
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
