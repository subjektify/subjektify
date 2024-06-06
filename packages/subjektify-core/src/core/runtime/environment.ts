import {
    ConfigExtender,
    ERRORS,
    EnvironmentExtender,
    RunTaskFunction,
    SubjektifyConfig,
    SubjektifyError,
    SubjektifyRuntimeEnvironment,
    SubjektifyTask,
    TaskArguments,
    TaskMap
} from "../../types";
import { Log } from "../../util";

export class Environment implements SubjektifyRuntimeEnvironment {

    config: SubjektifyConfig;
    tasks: TaskMap;
    version: string;

    /**
     * Initializes the Subjektify Runtime Environment and the given extender functions.
     */
    constructor(
        config: SubjektifyConfig,
        tasks: TaskMap,
        configExtenders: ConfigExtender[],
        environmentExtenders: EnvironmentExtender[]
    ) {
        this.config = config;
        this.tasks = tasks;
        this.version = "0.0.1";

        configExtenders.forEach(extender => extender(this.config));
        environmentExtenders.forEach(extender => extender(this));
    }

    run: RunTaskFunction = async (taskIdentifier, taskArguments) => {
        const task = this.tasks[taskIdentifier];
        if (!task) {
            throw new SubjektifyError(ERRORS.TASK.TASK_NOT_FOUND)
        }
        return this._runTaskAction(task, taskArguments);
    }

    private _runTaskAction = async (task: SubjektifyTask, taskArguments: TaskArguments): Promise<any> => {
        Log.verbose(`Running task: ${task.name}`);
        return task.action(taskArguments, this);
    }

}
