import * as fs from 'fs';
import * as path from 'path';

export class CreateModule {

    public blueprintNamespace = (namespace: string, projectPath: string, blueprint: string) => {
    }
    
    public defaultNamespace = (namespace: string, projectPath: string) => {
    }

    public pluginNamespace = (namespace: string, projectPath: string) => {
    }

    public static createTemplateProject(namespace: string, projectPath: string): void {
        const templatePath = path.join(__dirname, 'templates', 'project');
        fs.mkdirSync(projectPath);
        this.copyFolderRecursiveSync(templatePath, projectPath, namespace);
    }

    private static copyFileSync(source: string, target: string, namespace: string): void {
        let targetFile = target;
        // If target is a directory, a new file with the same name will be created
        if (fs.existsSync(target) && fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }
        const content = fs.readFileSync(source, 'utf8');
        const replacedContent = content.replace(/__NAMESPACE__/g, namespace);
        fs.writeFileSync(targetFile, replacedContent);
    }

    private static copyFolderRecursiveSync(source: string, target: string, namespace: string): void {
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
                    this.copyFolderRecursiveSync(curSource, targetFolder, namespace);
                } else {
                    this.copyFileSync(curSource, targetFolder, namespace);
                }
            });
        }
    }
}