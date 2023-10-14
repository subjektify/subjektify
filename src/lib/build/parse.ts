import fs from 'fs';
import path from 'path';
import { Context } from '../../types';
import { Log } from '../../util';
import { SubjektModel, parseSubjekt } from 'subjekt';

export const parseSources = (context: Context): SubjektModel[] => {

    // Check for sources
    const sources = context.config.sources;
    if (!sources) {
        Log.warn(`Missing 'sources' configuration. Nothing to build. Skipping...`);
        process.exit(1);
    }

    // Resolve sources directories
    const sourcesPaths = sources
        .map(source => path.join(context.namespacePath, source))
        .filter(sourcePath => fs.statSync(sourcePath).isDirectory());
    Log.debug(`Building for sources: ${sourcesPaths}`);

    // Resolve .subjekt files
    const subjektFiles = sourcesPaths
        .map(sourcePath => fs.readdirSync(sourcePath))
        .reduce((files, filesInPath) => files.concat(filesInPath), [])
        .filter(fileName => fileName.endsWith('.subjekt'))
        .map(fileName => path.join(context.namespacePath, fileName));
    Log.debug(`Found .subjekt files: ${subjektFiles}`);

    // Build the subjekt model
    const models = subjektFiles.map(subjektFile => parseSubjekt(subjektFile));

    return models;
}
