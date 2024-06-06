import fs from "fs";
import path from "path";
import { SubjektModel, SubjektParser } from "subjekt"
import { Log } from "subjektify"

export const parseSources = async (namespace: string, sources: string[]): Promise<SubjektModel[]> => {

    const parser = new SubjektParser();

    // Resolve sources directories
    const sourcesPaths = sources
        .map(source => path.join(process.cwd(), source))
        .filter(sourcePath => fs.statSync(sourcePath).isDirectory());
    Log.debug(`Building for sources: ${sourcesPaths}`);

    // Resolve .subjekt files
    const subjektFiles = sourcesPaths
    .map(sourcePath => {
        const filesInPath = fs.readdirSync(sourcePath);
        return filesInPath.map(fileName => path.join(sourcePath, fileName));
    })
    .reduce((files, filesInPath) => files.concat(filesInPath), [])
    .filter(filePath => filePath.endsWith('.subjekt'))
    .map(filePath => filePath);
    Log.debug(`Found .subjekt files: ${subjektFiles}`);

    // Build the subjekt model
    const subjektContents = subjektFiles.map(subjektFile => fs.readFileSync(subjektFile, 'utf8'));
    const models = subjektContents.map(subjektFile => parser.parse(namespace, subjektFile));

    return models;
}
