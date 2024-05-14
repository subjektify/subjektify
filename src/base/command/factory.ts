import { CreateCommand } from "../../commands";
import { RunCommand } from "../../commands/run";
import { Command } from "../../types";

export class CommandFactory {
    command(name: string): Command {
        switch (name) {
            case 'create':
                return new CreateCommand();
            case 'build':
            case 'compile':
            case 'deploy':
            case 'publish':
            case 'start':
            case 'test':
            case 'run':
                return new RunCommand();
            // Add more cases for other commands as needed
            default:
                throw new Error(`Unknown command: ${name}`);
        }
    }
}
