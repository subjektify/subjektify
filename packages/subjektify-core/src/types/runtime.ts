import { SubjektifyConfig } from "./config";
import { TaskArguments, TaskIdentifier, TaskMap } from "./tasks";

export type RunTaskFunction = (
    taskId: TaskIdentifier,
    taskArgs: TaskArguments
) => Promise<any>;

export interface SubjektifyRuntimeEnvironment {
    config: SubjektifyConfig;
    run: RunTaskFunction;
    tasks: TaskMap;
    version: string;
}
