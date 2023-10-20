import { BuildPipeline } from "../core";
import { Command } from "../types";

export class CommandFactory {
    static getCommand(commandName: string): Command {
        switch (commandName) {
            case 'build':
            case 'compile':
            case 'deploy':
            case 'publish':
            case 'start':
            case 'test':
                return new BuildPipeline();
            // Add more cases for other commands as needed
            default:
                throw new Error(`Unknown command: ${commandName}`);
        }
    }
}
