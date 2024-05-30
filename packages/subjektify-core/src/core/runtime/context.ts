import { ERRORS, SubjektifyConfig, SubjektifyError, SubjektifyRuntimeEnvironment, SubjektifyTask } from "../../types";
import { SubjektifyConfigLoader } from "../config";

export type GlobalWithSubjektifyContext = typeof globalThis & { _subjektifyContext: SubjektifyContext };

export class SubjektifyContext {
    
    public environment?: SubjektifyRuntimeEnvironment;
    public taskName?: string;
    public taskArgs?: string[];

    private constructor() { }

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

        await ctx.createEnvironment();

        globalWithContext._subjektifyContext = ctx;
        return ctx;
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
        const tasks: SubjektifyTask[] = [];
        this.environment = {
            config,
            tasks
        };
        return Promise.resolve(this.environment);
    }
}
