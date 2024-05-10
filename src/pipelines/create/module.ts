import fs from 'fs';
import path from 'path';
import { FS, Log } from '../../util';

export class CreateModule {

    public blueprintNamespace = (namespace: string, projectPath: string, blueprint: string) => {
        // TODO: Implement after blueprints are implemented
        Log.error(`Blueprints are not yet implemented! Stay tuned...`);
        process.exit(1);
    }
    
    public defaultNamespace = (namespace: string, projectPath: string) => {
        return this.fromLocalTemplate(namespace, projectPath, 'default');
    }

    public pluginNamespace = (namespace: string, projectPath: string) => {
        return this.fromLocalTemplate(namespace, projectPath, 'plugin');
    }

    private fromLocalTemplate = (namespace: string, projectPath: string, templateName: string) => {
        const templatePath = path.join(__dirname, '../../..', 'templates', templateName);
        fs.mkdirSync(projectPath);
        this.copyTemplate(templatePath, projectPath, namespace);
    }

    private copyTemplate = (templatePath: string, projectPath: string, namespace: string) => {
        const files = fs.readdirSync(templatePath);
        files.forEach((file) => {
            const curSource = path.join(templatePath, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                FS.copyFolderSync(curSource, projectPath, namespace);
            } else {
                FS.copyFileSync(curSource, projectPath, namespace);
            }
        });
    }
}
