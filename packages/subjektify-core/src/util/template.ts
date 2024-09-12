import fs from "fs";
import path from "path";
import { Eta } from "eta";
import { Log } from "./Log";

export class TemplateWriter {
  directory: string;
  private eta: Eta;

  constructor(directory: string) {
    this.directory = directory;
    this.eta = new Eta({
      useWith: true,
      views: path.resolve(__dirname, "..", "..", "templates", directory),
    });
    this.eta.templatesSync;
  }

  public writeProjectFiles(namespace: string): void {
    const subjectsPath = path.join(process.cwd(), "subjects");
    if (!fs.existsSync(subjectsPath)) {
      fs.mkdirSync(subjectsPath);
    }
    this.write(".gitignore", {});
    this.write("README.md", { namespace });
    this.write("package.json", { namespace });
    this.write("universe.subjekt", {}, path.join(process.cwd(), "subjects"));
  }

  public write(fileName: string, data: any, overrideOutput?: string): void {
    const templateName = `${fileName}.eta`;
    const fileContent = this.eta.render(templateName, data);
    const outputPath = overrideOutput || process.cwd();
    const filePath = path.join(outputPath, fileName);
    if (fs.existsSync(filePath)) {
      Log.warn(`File ${filePath} already exists. Skipping...`);
      return;
    }
    fs.writeFileSync(filePath, fileContent);
  }
}
