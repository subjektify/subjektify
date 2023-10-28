import * as fs from 'fs';
import * as path from 'path';
import { Log } from '../../util';

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
                this.copyFolderSync(curSource, projectPath, namespace);
            } else {
                this.copyFileSync(curSource, projectPath, namespace);
            }
        });
    }

    private copyFileSync(source: string, target: string, namespace: string): void {
        let targetFile = target;
        // If target is a directory, a new file with the same name will be created
        if (fs.existsSync(target) && fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }
        const content = fs.readFileSync(source, 'utf8');
        const replacedContent = content.replace(/__NAMESPACE__/g, namespace);
        fs.writeFileSync(targetFile, replacedContent);
    }

    private copyFolderSync(source: string, target: string, namespace: string): void {
        let files = [];
        // Check if folder needs to be created or integrated
        const targetFolder = path.join(target, path.basename(source));
        if (!fs.existsSync(targetFolder)) {
            fs.mkdirSync(targetFolder);
        }
        // Copy
        if (fs.lstatSync(source).isDirectory()) {
            files = fs.readdirSync(source);
            files.forEach((file) => {
                const curSource = path.join(source, file);
                if (fs.lstatSync(curSource).isDirectory()) {
                    this.copyFolderSync(curSource, targetFolder, namespace);
                } else {
                    this.copyFileSync(curSource, targetFolder, namespace);
                }
            });
        }
    }
}