import { CommandOptions, TaskAction, Task, SubjektifyRuntimeEnvironment } from "../../types";
import { BaseTask } from "./BaseTask";

export function task(name: string, description?: string, action?: TaskAction): Task {
    const task = new BaseTask(name, action || defaultFunction)
        .setDescription(description || '');
    return task;
}

const defaultFunction = (options: CommandOptions, runtime: SubjektifyRuntimeEnvironment) => {
    return Promise.resolve();
};
