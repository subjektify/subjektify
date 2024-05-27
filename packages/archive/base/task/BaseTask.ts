import { SubjektifyRuntimeEnvironment, Task, TaskAction, TaskOption } from "../../types";
import { Context } from "../runtime";

export class BaseTask implements Task {

    name: string;
    description?: string;
    action: TaskAction;
    flags: string[] = [];
    options: TaskOption<any>[] = [];

    private _runtime: SubjektifyRuntimeEnvironment;

    constructor(name: string, action: TaskAction) {
        this.name = name;
        this.action = action;
        this._runtime = Context.getInstance().runtime();
    }

    public async run(): Promise<any> {
        return this.action(this.options, this._runtime);
    }

    addFlag(name: string): this {
        this.flags.push(name);
        return this;
    }

    addOption<T>(option: TaskOption<T>): this {
        this.options.push(option);
        return this;
    }

    setAction(action: TaskAction): this {
        this.action = action;
        return this;
    }

    setDescription(description: string): this {
        this.description = description;
        return this;
    }
}
