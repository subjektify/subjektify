import { SubjektifyConfig } from "./config";
import { TaskMap } from "./task";

export interface SubjektifyRuntimeEnvironment {
    readonly config: SubjektifyConfig;
    readonly artifacts: string;
    readonly tasks: TaskMap;
    readonly version: string;
}
