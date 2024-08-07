import fs from "fs";
import path from "path";
import { Eta } from "eta";

export class TemplateWriter {
    directory: string;
    private eta: Eta;
    
    constructor(directory: string) {
        this.directory = directory;
        this.eta = new Eta({
            useWith: true,
            views: path.resolve(__dirname, "..", "..", "templates", directory)
        });
        this.eta.templatesSync
    }

    public writeProjectFiles(namespace: string): void {
        this.write(".gitignore", {});
        this.write("README.md", { namespace });
        this.write("package.json", { namespace });
        fs.mkdirSync(path.join(process.cwd(), "subjects"));
        this.write("universe.subjekt", {}, path.join(process.cwd(), "subjects"));
    }
    
    public write(fileName: string, data: any, overrideOutput?: string): void {
        const templateName = `${fileName}.eta`;
        const fileContent = this.eta.render(templateName, data);
        const outputPath = overrideOutput || process.cwd();
        const filePath = path.join(outputPath, fileName);
        fs.writeFileSync(filePath, fileContent);
    }

}
