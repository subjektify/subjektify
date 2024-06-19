import fs from "fs";
import path from "path";
import { ASTModel } from "subjekt";

export class SubjektifyBuildWriter {

    public write(astModel: ASTModel, astProjections: Record<string, ASTModel>, outputDirectory: string) {
        console.log("Writing ast model to output directory: ", outputDirectory);

        const absoluteOutputDirectory = path.join(process.cwd(), outputDirectory);

        if (!fs.existsSync(absoluteOutputDirectory)) {
            fs.mkdirSync(absoluteOutputDirectory, { recursive: true });
        }

        fs.writeFileSync(path.join(absoluteOutputDirectory, "ast.json"), JSON.stringify(astModel, null, 2));

        Object.keys(astProjections).forEach((projectionName) => {
            const projection = astProjections[projectionName];
            fs.writeFileSync(path.join(absoluteOutputDirectory, `${projectionName}.json`), JSON.stringify(projection, null, 2));
        });
    }
}
