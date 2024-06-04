import { ERRORS, SubjektifyConfig, SubjektifyError, SubjektifyRuntimeEnvironment, TaskArguments, TaskMap } from "../../types";
import { SubjektifyConfigLoader } from "../config";
import { TaskManager } from "../tasks";
import { Environment } from "./environment";

export type GlobalWithSubjektifyContext = typeof globalThis & { _subjektifyContext: SubjektifyContext };

export class SubjektifyContext {
    
    public environment?: SubjektifyRuntimeEnvironment;
    public taskName: string;
    public taskArgs: TaskArguments;
    public taskManager: TaskManager;

    private loader: SubjektifyConfigLoader;

    private constructor(taskName: string, taskArgs: TaskArguments) {
        this.taskName = taskName;
        this.taskArgs = taskArgs;
        this.taskManager = new TaskManager();
        this.loader = new SubjektifyConfigLoader();
    }

    public static isCreated(): boolean {
        const globalWithContext = global as GlobalWithSubjektifyContext;
        return globalWithContext._subjektifyContext !== undefined;
    }

    public static get(): SubjektifyContext {
        const globalWithContext = global as GlobalWithSubjektifyContext;
        if (!globalWithContext._subjektifyContext) {
            throw new SubjektifyError(ERRORS.GENERAL.CONTEXT_NOT_CREATED);
        }
        return globalWithContext._subjektifyContext;
    }

    public static async create(name: string, args: string[]): Promise<SubjektifyContext> {
        if (SubjektifyContext.isCreated()) {
            throw new SubjektifyError(ERRORS.GENERAL.CONTEXT_ALREADY_CREATED);
        }
        const globalWithContext = global as GlobalWithSubjektifyContext;
        const ctx = new SubjektifyContext(name, args);

        await ctx._createEnvironment();

        globalWithContext._subjektifyContext = ctx;
        return ctx;
    }

    public static delete(): void {
        const globalWithContext = global as any;
        globalWithContext._subjektifyContext = undefined;
    }

    private async _createEnvironment(): Promise<SubjektifyRuntimeEnvironment> {
        if (this.environment) {
            throw new SubjektifyError(ERRORS.GENERAL.ENVIRONMENT_ALREADY_CREATED);
        }
        const config: SubjektifyConfig = await this._loadConfig();
        const tasks: TaskMap = this.taskManager.getTasks();
        this.environment = new Environment(config, tasks);
        return Promise.resolve(this.environment);
    }

    private async _loadConfig(): Promise<SubjektifyConfig> {
        return this.loader.load();
    }
}
