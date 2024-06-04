import fs from "fs";
import path from "path";
import { ERRORS, SubjektifyConfig, SubjektifyError } from "../../types";
import { DEFAULT_CONFIG } from "./defaults";
import { Log } from "../../util";

export class SubjektifyConfigLoader {

    private filePath: string;
    private config?: SubjektifyConfig;

    constructor() {
        this.filePath = this.resolvePath();
    }

    public configExists(): boolean {
        return this.filePath !== "";
    }

    public async load(): Promise<SubjektifyConfig> {
        if (!this.configExists()) {
            throw new SubjektifyError(ERRORS.CONFIG.NO_CONFIG_FILE);
        }

        Log.debug(`Loading config file: ${this.filePath}`);
        let userConfig = await this._importCjsOrEsm();

        console.log(userConfig);
        return Promise.resolve(DEFAULT_CONFIG);
    }

    public resolvePath(): string {
        const jsPath = path.join(process.cwd(), "subjektify.config.js");
        const tsPath = path.join(process.cwd(), "subjektify.config.ts");

        if (fs.existsSync(jsPath)) {
            return jsPath.normalize();
        } else if (fs.existsSync(tsPath)) {
            return tsPath.normalize();
        }
        return "";
    }

    private async _importCjsOrEsm(): Promise<any> {
        try {
            const module = await import(this.filePath);
            return module.default || module;
        } catch (e: any) {
            Log.error(`Error loading config file: ${e}`);
            throw new SubjektifyError(ERRORS.CONFIG.LOAD_ERROR);
        }
    }
}
