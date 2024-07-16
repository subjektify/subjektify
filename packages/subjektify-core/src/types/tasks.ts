import { SubjektifyRuntimeEnvironment } from "./runtime";

export type TaskIdentifier = string;

export type TaskArguments = any;

export type TaskAction<T extends TaskArguments> = (
  args: T,
  env: SubjektifyRuntimeEnvironment,
) => Promise<any>;

export interface SubjektifyTask {
  name: TaskIdentifier;
  description?: string;
  action: TaskAction<TaskArguments>;
}

export type TaskMap = {
  [key: TaskIdentifier]: SubjektifyTask[];
};
