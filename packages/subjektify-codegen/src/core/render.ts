import { execSync } from "child_process";
import { SubjektModel } from "subjekt";
import { Log } from "subjektify";

export const render = (target: string, language: string, outputDirectory: string, model: SubjektModel) => {
    try {
        Log.info(`Rendering template for ${target} in ${language} to ${outputDirectory}...`);

        const context = {
            model: JSON.stringify(model),
            target,
            language,
        };

        const hygenCommand = `hygen ${target} ${language} --model '${context.model}' --language ${language} --output ${outputDirectory}`;
        execSync(hygenCommand, { stdio: 'inherit' });

        Log.success(`Template rendered successfully to ${outputDirectory}.`);
    } catch (error) {
        Log.error(`Failed to render template for ${target} in ${language}: ${error}`);
    }
};
