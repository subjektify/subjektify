import { CommandOptions } from "./command";
import { SubjektifyRuntimeEnvironment } from "./runtime";

export type TaskAction = (options: CommandOptions, runtime: SubjektifyRuntimeEnvironment) => Promise<any>;

export type TaskOption<T> = {
    name: string,
    description?: string,
    defaultValue?: T,
    optional?: boolean
}

export interface Task {
    name: string;
    description?: string;
    action: TaskAction;
    addFlag(name: string, optional?: boolean): this;
    addOption<T>(option: TaskOption<T>): this;
    setAction(action: TaskAction): this;
    setDescription(description: string): this;
}

export interface TaskMap {
    [name: string]: Task;
}
