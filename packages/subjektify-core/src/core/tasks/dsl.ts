import { SubjektifyTask, TaskAction, TaskIdentifier, TaskArguments, TaskMap, SubjektifyError, ERRORS } from "../../types";

/**
 * This class is used to define the domain specific language for handling tasks within subjektify.
 */
export class TasksDsl {

    private tasks: TaskMap;

    constructor() {
        this.tasks = {};
    }

    public getTasks(): TaskMap {
        return this.tasks;
    }

    public getTask(name: TaskIdentifier): SubjektifyTask | undefined {
        return this.tasks[name];
    }

    public task<T extends TaskArguments>(
        name: TaskIdentifier,
        description?: string,
        action?: TaskAction<T>
    ): SubjektifyTask;

    public task<T extends TaskArguments>(
      name: TaskIdentifier,
      action: TaskAction<T>
    ): SubjektifyTask;

    public task<T extends TaskArguments>(
      name: TaskIdentifier,
      descriptionOrAction?: string | TaskAction<T>,
      action?: TaskAction<T>
    ): SubjektifyTask {
      return this._addTask(name, descriptionOrAction, action);
    }

    private _addTask<T extends TaskArguments>(
        identifier: TaskIdentifier,
        descriptionOrAction?: string | TaskAction<T>,
        action?: TaskAction<T>
    ): SubjektifyTask {

        let taskDefinition: SubjektifyTask = {
            name: identifier,
            action: this._defaultTaskAction()
        };

        if (descriptionOrAction instanceof Function) {
            action = descriptionOrAction;
            descriptionOrAction = undefined;
        }
        if (descriptionOrAction !== undefined) {
            taskDefinition.description = descriptionOrAction;
        }
        if (action !== undefined) {
            taskDefinition.action = action;
        }

        this.tasks[identifier] = taskDefinition;

        return taskDefinition;
    }

    private _defaultTaskAction = () => {
        throw new SubjektifyError(ERRORS.TASKS.ACTION_NOT_SET);
    }

}
