import fs from "fs";
import path from "path";
import { ERRORS, SubjektifyConfig, SubjektifyError } from "../../types";
import { Log } from "../../util";
import { SUBJEKTIFY_CONFIG_NAME } from "../constants";

export class SubjektifyConfigLoader {
  private filePath: string;

  constructor() {
    this.filePath = this.resolvePath();
  }

  public configExists(): boolean {
    return this.filePath !== "";
  }

  public load(): SubjektifyConfig {
    if (!this.configExists()) {
      throw new SubjektifyError(ERRORS.CONFIG.NO_CONFIG_FILE);
    }

    Log.debug(`Loading config file: ${this.filePath}`);

    this._loadTsNode();

    let userConfig = this._importCjsOrEsm();

    return userConfig as SubjektifyConfig;
  }

  public resolvePath(): string {
    const jsPath = path.join(process.cwd(), SUBJEKTIFY_CONFIG_NAME.JAVASCRIPT);
    const tsPath = path.join(process.cwd(), SUBJEKTIFY_CONFIG_NAME.TYPESCRIPT);

    if (fs.existsSync(jsPath)) {
      return jsPath.normalize();
    } else if (fs.existsSync(tsPath)) {
      return tsPath.normalize();
    }
    return "";
  }

  private _importCjsOrEsm(): any {
    try {
      const module = require(this.filePath);
      return module.default || module;
    } catch (e: any) {
      if (e instanceof SubjektifyError) {
        throw e;
      }
      Log.error(`Error loading config file: ${e}`);
      throw new SubjektifyError(ERRORS.CONFIG.LOAD_ERROR);
    }
  }

  private _loadTsNode(): void {
    try {
      require.resolve("typescript");
    } catch (e) {
      throw new SubjektifyError(ERRORS.GENERAL.TYPESCRIPT_NOT_INSTALLED);
    }
    try {
      require("ts-node").register();
    } catch (e) {
      throw new SubjektifyError(ERRORS.GENERAL.TS_NODE_NOT_INSTALLED);
    }
  }
}
