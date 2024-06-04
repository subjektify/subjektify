import { SubjektifyConfig } from "./config";
import { TaskArguments, TaskIdentifier, TaskMap } from "./tasks";

export type RunTaskFunction = (
    taskIdentifier: TaskIdentifier,
    taskArguments: TaskArguments
) => Promise<any>;

export interface SubjektifyRuntimeEnvironment {
    config: SubjektifyConfig;
    run: RunTaskFunction;
    tasks: TaskMap;
    version: string;
}
