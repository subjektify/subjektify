import { CreateCommand } from "../../commands";
import { Command } from "../../types";

export class CommandFactory {
    command(name: string): Command {
        switch (name) {
            case 'create':
                return new CreateCommand();
            case 'compile':
            case 'deploy':
            case 'publish':
            case 'start':
            case 'test':
            // Add more cases for other commands as needed
            default:
                throw new Error(`Unknown command: ${name}`);
        }
    }
}
