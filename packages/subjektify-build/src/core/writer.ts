import fs from "fs";
import path from "path";
import { AstModel } from "subjekt";

export class SubjektifyBuildWriter {
  public write(
    astModel: AstModel,
    astProjections: Record<string, AstModel>,
    outputDirectory: string,
  ) {
    const absoluteOutputDirectory = path.join(process.cwd(), outputDirectory);

    if (!fs.existsSync(absoluteOutputDirectory)) {
      fs.mkdirSync(absoluteOutputDirectory, { recursive: true });
    }

    if (Object.keys(astProjections).length > 0) {
      fs.mkdirSync(path.join(absoluteOutputDirectory, "projections"), {
        recursive: true,
      });
    }

    fs.writeFileSync(
      path.join(absoluteOutputDirectory, "ast.json"),
      JSON.stringify(astModel, null, 2),
    );

    Object.keys(astProjections).forEach((projectionName) => {
      const projection = astProjections[projectionName];
      fs.writeFileSync(
        path.join(
          absoluteOutputDirectory,
          "projections",
          `${projectionName}.json`,
        ),
        JSON.stringify(projection, null, 2),
      );
    });
  }
}
