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
    }
    
    public render(fileName: string, data: any, outputPath: string): void {
        const templateName = `${fileName}.eta`;
        const fileContent = this.eta.render(templateName, data);
        const filePath = path.join(outputPath, fileName);
        fs.writeFileSync(filePath, fileContent);
    }

}