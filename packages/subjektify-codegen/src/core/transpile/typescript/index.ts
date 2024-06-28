import path from "path";
import { SubjektifyModel } from "@subjektifylabs/subjektify-build";
import { CodeTranspiler } from "../base";
import { parse } from "../../parse";

export class TypescriptTranspiler extends CodeTranspiler {

    extension(): string {
        return '.ts';
    }

    async transpile(model: SubjektifyModel) {
        const generator = this.generator;
        const outputDir = generator.outputDirectory();
        
        // Create tsconfig.json
        const tsconfig = generator.eta.render('tsconfig.json.eta', {});
        generator.write(path.join(outputDir, 'tsconfig.json'), tsconfig);

        // Create src directory
        generator.mkdir(path.join(outputDir, 'src'));

        // Create index file
        const indexFile = generator.eta.render('index.eta', {
            model: model
        });
        generator.write(path.join(outputDir, 'src', 'index' + this.extension()), indexFile);

        // Create model files
        const parsedModel = parse(model.semantic);
        
        // Write types
        const typesFile = generator.eta.render('types.eta', {
            model: parsedModel
        });
        generator.write(path.join(outputDir, 'src', 'types' + this.extension()), typesFile);
    }
}
