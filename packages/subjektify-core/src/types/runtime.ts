import { SubjektifyConfig } from "./config";
import { SubjektifyTask } from "./tasks";

export interface SubjektifyRuntimeEnvironment {
    config: SubjektifyConfig;
    tasks: SubjektifyTask[];
}
