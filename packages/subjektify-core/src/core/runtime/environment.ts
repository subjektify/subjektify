import { RunTaskFunction, SubjektifyConfig, SubjektifyRuntimeEnvironment, TaskMap } from "../../types";

export class Environment implements SubjektifyRuntimeEnvironment {

    config: SubjektifyConfig;
    tasks: TaskMap;
    version: string;

    /**
     * Initializes the Subjektify Runtime Environment and the given extender functions.
     */
    constructor(
        config: SubjektifyConfig,
        tasks: TaskMap
    ) {
        this.config = config;
        this.tasks = tasks;
        this.version = "0.0.1";
    }

    run: RunTaskFunction = async (taskId, taskArgs) => {
    }

}
