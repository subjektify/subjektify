import { Eta } from 'eta';
import fs from 'fs';
import path from 'path';
import { SubjektModel } from "subjekt";
import { Log } from "subjektify";

export const render = async (target: string, language: string, outputDirectory: string, model: SubjektModel) => {
    try {
        Log.info(`Rendering template for ${target} in ${language} to ${outputDirectory}...`);

        const templateDir = path.resolve(__dirname, '..', '..', `templates`, target, language);
        const files = fs.readdirSync(templateDir);

        const eta = new Eta({ views: templateDir });

        for (const file of files) {
            const templateExtension = path.extname(file);
            if (templateExtension !== '.eta') {
                continue;
            }
            const templateName = path.basename(file, templateExtension);
            const outputFileName = file.replace('.eta', language === 'solidity' ? '.sol' : '.ts');
            const outputPath = path.join(outputDirectory, outputFileName);
            const outputContent = eta.render(templateName, { model, target, language, outputDirectory });

            fs.writeFileSync(outputPath, outputContent);
        }

        Log.success(`Templates rendered successfully to ${outputDirectory}.`);
    } catch (error) {
        Log.error(`Failed to render templates for ${target} in ${language}: ${error}`);
    }
};
