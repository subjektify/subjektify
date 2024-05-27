import { Artifacts } from "./artifact";
import { SubjektifyConfig } from "./config";
import { TaskMap } from "./task";

export interface SubjektifyRuntimeEnvironment {
    config: SubjektifyConfig;
    artifacts: Artifacts;
    tasks: TaskMap;
    readonly version: string;
}
