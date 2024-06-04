import { ERRORS, SubjektifyConfig, SubjektifyError, SubjektifyRuntimeEnvironment, TaskMap } from "../../types";
import { SubjektifyConfigLoader } from "../config";
import { TaskManager } from "../tasks";
import { Environment } from "./environment";

export type GlobalWithSubjektifyContext = typeof globalThis & { _subjektifyContext: SubjektifyContext };

export class SubjektifyContext {
    
    public environment?: SubjektifyRuntimeEnvironment;
    public taskName?: string;
    public taskArgs?: string[];
    public taskManager: TaskManager;

    private constructor() {
        this.taskManager = new TaskManager();
    }

    public static isCreated(): boolean {
        const globalWithContext = global as GlobalWithSubjektifyContext;
        return globalWithContext._subjektifyContext !== undefined;
    }

    public static async create(name: string, args: string[]): Promise<SubjektifyContext> {
        if (SubjektifyContext.isCreated()) {
            throw new SubjektifyError(ERRORS.GENERAL.CONTEXT_ALREADY_CREATED);
        }
        const globalWithContext = global as GlobalWithSubjektifyContext;
        const ctx = new SubjektifyContext();

        ctx.taskName = name;
        ctx.taskArgs = args;

        globalWithContext._subjektifyContext = ctx;
        return ctx;
    }

    public static get(): SubjektifyContext {
        const globalWithContext = global as GlobalWithSubjektifyContext;
        if (!globalWithContext._subjektifyContext) {
            throw new SubjektifyError(ERRORS.GENERAL.CONTEXT_NOT_CREATED);
        }
        return globalWithContext._subjektifyContext;
    }

    public static delete(): void {
        const globalWithContext = global as any;
        globalWithContext._subjektifyContext = undefined;
    }

    private async createEnvironment(): Promise<SubjektifyRuntimeEnvironment> {
        if (this.environment) {
            throw new SubjektifyError(ERRORS.GENERAL.ENVIRONMENT_ALREADY_CREATED);
        }
        const loader = new SubjektifyConfigLoader();
        const config: SubjektifyConfig = await loader.load();
        const tasks: TaskMap = this.taskManager.getTasks();
        this.environment = new Environment(config, tasks);
        return Promise.resolve(this.environment);
    }
}
