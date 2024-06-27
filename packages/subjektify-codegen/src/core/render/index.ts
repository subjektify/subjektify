import { Eta } from 'eta';
import fs from 'fs';
import path from 'path';
import { SubjektModel } from "subjekt";
import { Log } from "subjektify";
import { CodeGenConfig } from '../types';

export const render = async (config: CodeGenConfig, model: SubjektModel) => {
    const { target, language, outputDirectory, version } = config;
    const resolvedOutputDirectory = outputDirectory? path.resolve(process.cwd(), outputDirectory) : path.resolve(process.cwd(), target, version || 'latest');
    Log.info(`Rendering template for ${target} in ${language} to ${resolvedOutputDirectory}...`);

    try {
        const templateDir = path.resolve(__dirname, '..', '..', `templates`, target, language);

        const eta = new Eta({ views: templateDir });

        const files = fs.readdirSync(templateDir);
        for (const file of files) {
            const templateExtension = path.extname(file);
            if (templateExtension !== '.eta') {
                continue;
            }
            const templateName = path.basename(file, templateExtension);
            const outputFileName = file.replace('.eta', language === 'solidity' ? '.sol' : '.ts');
            const outputPath = path.join(resolvedOutputDirectory, outputFileName);
            const outputContent = eta.render(templateName, { model, target, language, outputDirectory, version });

            fs.writeFileSync(outputPath, outputContent);
        }

        Log.success(`Templates rendered successfully to ${outputDirectory}.`);
    } catch (error) {
        Log.error(`Failed to render templates for ${target} in ${language}: ${error}`);
        throw error;
    }
};
