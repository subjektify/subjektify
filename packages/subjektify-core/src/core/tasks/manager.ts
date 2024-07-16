import {
  SubjektifyTask,
  TaskAction,
  TaskIdentifier,
  TaskArguments,
  TaskMap,
  SubjektifyError,
  ERRORS,
} from "../../types";
import { Log } from "../../util";

/**
 * This class is used to define the domain specific language for handling tasks within subjektify.
 */
export class TaskManager {
  private tasks: TaskMap;

  constructor() {
    this.tasks = {};
  }

  public getTasks(): TaskMap {
    return this.tasks;
  }

  public getTasksByName(name: TaskIdentifier): SubjektifyTask[] | undefined {
    return this.tasks[name];
  }

  public task<T extends TaskArguments>(
    name: TaskIdentifier,
    description?: string,
    action?: TaskAction<T>,
  ): SubjektifyTask;

  public task<T extends TaskArguments>(
    name: TaskIdentifier,
    action: TaskAction<T>,
  ): SubjektifyTask;

  public task<T extends TaskArguments>(
    name: TaskIdentifier,
    descriptionOrAction?: string | TaskAction<T>,
    taskAction?: TaskAction<T>,
  ): SubjektifyTask {
    return this._addTask(name, descriptionOrAction, taskAction);
  }

  private _addTask<T extends TaskArguments>(
    identifier: TaskIdentifier,
    descriptionOrAction?: string | TaskAction<T>,
    taskAction?: TaskAction<T>,
  ): SubjektifyTask {
    let description: string | undefined;
    let action: TaskAction<T> | undefined;

    Log.verbose(`Adding task: ${identifier}`);

    if (descriptionOrAction instanceof Function) {
      action = descriptionOrAction;
      description = undefined;
      descriptionOrAction = undefined;
    }
    if (descriptionOrAction !== undefined) {
      description = descriptionOrAction;
    }
    if (taskAction !== undefined) {
      action = taskAction;
    }

    const taskDefinition: SubjektifyTask = {
      name: identifier,
      description: description,
      action: action || this._defaultTaskAction(),
    };

    if (this.tasks[identifier]) {
      this.tasks[identifier].push(taskDefinition);
    } else {
      this.tasks[identifier] = [taskDefinition];
    }

    return taskDefinition;
  }

  private _defaultTaskAction = () => {
    throw new SubjektifyError(ERRORS.TASK.ACTION_NOT_SET);
  };
}
