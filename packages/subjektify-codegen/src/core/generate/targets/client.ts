import path from 'path';
import { CodeGenerator } from "./base";
import { SubjektifyModel } from "@subjektifylabs/subjektify-build/dist/core/types";

export class ClientGenerator extends CodeGenerator {

    extension(): string {
        return this.config.language == 'typescript' ? '.ts' : '.js';
    }

    async generate(model: SubjektifyModel) {
        
        const outputDir = this.createOutputDirectory();

        // Create package.json
        const packageJson = this.eta.render('package.json.eta', { 
            namespace: this.config.packageName || this.subjektifyConfig.namespace,
            version: this.subjektifyConfig.version,
         });
        this.write(path.join(outputDir, 'package.json'), packageJson);

        // Create tsconfig.json for TypeScript projects.
        if (this.config.language == 'typescript') {
            const tsconfig = this.eta.render('tsconfig.json.eta', {});
            this.write(path.join(outputDir, 'tsconfig.json'), tsconfig);
        }
    }
}
