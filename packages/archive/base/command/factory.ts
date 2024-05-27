import { BuildCommand, CreateCommand, InitCommand, RunCommand } from "../../commands";
import { Command } from "../../types";

export class CommandFactory {
    command(name: string): Command {
        switch (name) {
            case 'build':
                return new BuildCommand();
            case 'create':
                return new CreateCommand();
            case 'init':
                return new InitCommand();
            default:
                return new RunCommand();
        }
    }
}
