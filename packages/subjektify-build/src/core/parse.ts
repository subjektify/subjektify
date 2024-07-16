import fs from "fs";
import path from "path";
import { AstModel, AstParser, SubjektModel, SubjektParser } from "subjekt";

export class SubjektifyParser {
  private _namespace: string;
  private _sources: string[];
  private _astParser: AstParser;
  private _subjektParser: SubjektParser;

  constructor(namespace: string, sources: string[]) {
    this._namespace = namespace;
    this._sources = sources;
    this._astParser = new AstParser();
    this._subjektParser = new SubjektParser();
  }

  public parseAstModels(): AstModel[] {
    return this._readSubjektFiles().map((subjektFile) =>
      this._astParser.parse(this._namespace, subjektFile),
    );
  }

  public parseSubjektModels(): SubjektModel[] {
    return this._readSubjektFiles().map((subjektFile) =>
      this._subjektParser.parse(this._namespace, subjektFile),
    );
  }

  private _readSubjektFiles(): string[] {
    return this._resolveSubjektFiles().map((filePath) =>
      fs.readFileSync(filePath, "utf8"),
    );
  }

  private _resolveSubjektFiles(): string[] {
    return this._resolvePaths()
      .map((sourcePath) => {
        const filesInPath = fs.readdirSync(sourcePath);
        return filesInPath.map((fileName) => path.join(sourcePath, fileName));
      })
      .reduce((files, filesInPath) => files.concat(filesInPath), [])
      .filter((filePath) => filePath.endsWith(".subjekt"))
      .map((filePath) => filePath);
  }

  private _resolvePaths(): string[] {
    return this._sources
      .map((source) => path.join(process.cwd(), source))
      .filter((sourcePath) => fs.statSync(sourcePath).isDirectory());
  }
}
