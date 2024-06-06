import {
    ConfigExtender,
    ERRORS,
    EnvironmentExtender,
    SubjektifyConfig,
    SubjektifyError,
    SubjektifyRuntimeEnvironment,
    TaskArguments,
    TaskIdentifier,
    TaskMap
} from "../../types";
import { SubjektifyConfigLoader } from "../config";
import { TaskManager } from "../tasks";
import { Environment } from "./environment";

export type GlobalWithSubjektifyContext = typeof globalThis & { _subjektifyContext: SubjektifyContext };

export class SubjektifyContext {
    
    public environment?: SubjektifyRuntimeEnvironment;
    public taskName?: string;
    public taskArgs?: TaskArguments;
    public taskManager: TaskManager;
    public configExtenders: ConfigExtender[];
    public environmentExtenders: EnvironmentExtender[];

    private loader: SubjektifyConfigLoader;

    private constructor() {
        this.taskManager = new TaskManager();
        this.loader = new SubjektifyConfigLoader();
        this.configExtenders = [];
        this.environmentExtenders = [];
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

    public static async create(taskName: TaskIdentifier, taskArgs: TaskArguments): Promise<SubjektifyContext> {
        if (SubjektifyContext.isCreated()) {
            throw new SubjektifyError(ERRORS.GENERAL.CONTEXT_ALREADY_CREATED);
        }
        const globalWithContext = global as GlobalWithSubjektifyContext;
        const ctx = new SubjektifyContext();
        ctx.taskName = taskName;
        ctx.taskArgs = taskArgs;

        globalWithContext._subjektifyContext = ctx;
        await ctx._createEnvironment();

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
        const config: SubjektifyConfig = await this.loader.load();
        const tasks: TaskMap = this.taskManager.getTasks();
        this.environment = new Environment(config, tasks, this.configExtenders, this.environmentExtenders);
        return Promise.resolve(this.environment);
    }
}
