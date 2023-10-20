import { CommandOptions } from "../types";
import { CommandFactory } from "./factory";

export const runCommand = (name: string, options?: CommandOptions) => {
    const command = CommandFactory.getCommand(name);
    command.run(name, options);
}
