import { Command, CommandOptions } from "../types";

export class InitCommand implements Command {

    run(namespace?: string, options?: CommandOptions): Promise<void> {
        throw new Error("Method not implemented.");
    }
}