import fs from "fs";
import path from "path";
import { SubjektifyConfig } from "../../types";
import { DEFAULT_CONFIG } from "./defaults";

export class SubjektifyConfigLoader {

    public configExists(): boolean {
        return this.resolvePath() !== "";
    }

    public load(): SubjektifyConfig {
        const configPath = this.resolvePath();
        return DEFAULT_CONFIG;
    }

    public resolvePath(): string {
        const jsPath = path.join(process.cwd(), "subjektify.config.js");
        const tsPath = path.join(process.cwd(), "subjektify.config.ts");

        if (fs.existsSync(jsPath)) {
            return jsPath;
        } else if (fs.existsSync(tsPath)) {
            return tsPath;
        }
        return "";
    }
}
