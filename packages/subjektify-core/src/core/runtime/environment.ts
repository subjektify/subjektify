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
import { getVersion } from "./version";

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
        this.version = getVersion();

        configExtenders.forEach(extender => extender(this.config));
        environmentExtenders.forEach(extender => extender(this));
    }

    run: RunTaskFunction = async (taskIdentifier, taskArguments) => {
        const tasks = this.tasks[taskIdentifier];
        if (!tasks) {
            throw new SubjektifyError(ERRORS.TASK.TASK_NOT_FOUND)
        }
        return this._runTaskActions(tasks, taskArguments);
    }

    private _runTaskActions = async (tasks: SubjektifyTask[], taskArguments: TaskArguments): Promise<any> => {
        for (const task of tasks) {
            await task.action(taskArguments, this);
        }
        return;
    }
}
