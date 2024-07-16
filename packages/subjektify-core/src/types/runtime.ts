import { SubjektifyConfig } from "./config";
import { TaskArguments, TaskIdentifier, TaskMap } from "./tasks";

export type EnvironmentExtender = (
  environment: SubjektifyRuntimeEnvironment,
) => void;

export type RunTaskFunction = (
  taskIdentifier: TaskIdentifier,
  taskArguments: TaskArguments,
) => Promise<any>;

export interface SubjektifyRuntimeEnvironment {
  readonly config: SubjektifyConfig;
  readonly run: RunTaskFunction;
  readonly tasks: TaskMap;
  readonly version: string;
}
