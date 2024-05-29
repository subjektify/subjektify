import { ERRORS, SubjektifyError, SubjektifyRuntimeEnvironment } from "../../types";

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

    public static create(name: string, args: string[]): SubjektifyContext {
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

    public static delete(): void {
        const globalWithContext = global as any;
        globalWithContext._subjektifyContext = undefined;
    }
}
