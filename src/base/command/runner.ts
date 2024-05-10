import { CommandFactory } from "./factory";

export class CommandRunner {

    factory: CommandFactory;

    constructor() {
        this.factory = new CommandFactory();
    }
    
    public async run(command: string, ...args: any[]): Promise<void> {
        const cmd = this.factory.command(command);
        cmd.run(command, ...args);
    }
}
