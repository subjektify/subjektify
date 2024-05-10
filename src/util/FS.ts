import fs from 'fs';
import path from 'path';

export class FS {
    
    /**
     * Recursively copies a file from source to target, replacing __NAMESPACE__ with the namespace provided.
     */
    public static copyFileSync(source: string, target: string, namespace: string): void {
        let targetFile = target;
        // If target is a directory, a new file with the same name will be created
        if (fs.existsSync(target) && fs.lstatSync(target).isDirectory()) {
            targetFile = path.join(target, path.basename(source));
        }
        const content = fs.readFileSync(source, 'utf8');
        const replacedContent = content.replace(/__NAMESPACE__/g, namespace);
        fs.writeFileSync(targetFile, replacedContent);
    }

    /**
     * Recursively copies a folder from source to target, replacing __NAMESPACE__ with the namespace provided.
     */
    public static copyFolderSync(source: string, target: string, namespace: string): void {
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