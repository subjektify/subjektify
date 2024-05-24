import { Task, TaskAction, TaskOption } from "../../types";

export class BaseTask implements Task {
    name: string;
    description?: string;
    action: TaskAction;
    flags: string[] = [];
    options: TaskOption<any>[] = [];

    constructor(name: string, action: TaskAction) {
        this.name = name;
        this.action = action;
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
