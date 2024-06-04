import { SubjektifyTask, TaskAction, TaskArguments, TaskIdentifier } from "../../types";
import { SubjektifyContext } from "../runtime";

export function task<T extends TaskArguments>(
  name: TaskIdentifier,
  description?: string,
  action?: TaskAction<T>
): SubjektifyTask;

export function task<T extends TaskArguments>(
  name: TaskIdentifier,
  action: TaskAction<T>
): SubjektifyTask;

export function task<T extends TaskArguments>(
  name: TaskIdentifier,
  descriptionOrAction?: string | TaskAction<T>,
  action?: TaskAction<T>
): SubjektifyTask {
    const ctx = SubjektifyContext.get();
    const manager = ctx.taskManager;

    if (descriptionOrAction === undefined) {
        return manager.task(name);
    }

    if (typeof descriptionOrAction !== 'string') {
        return manager.task(name, descriptionOrAction);
    }
    
    return manager.task(name, descriptionOrAction, action);
}
