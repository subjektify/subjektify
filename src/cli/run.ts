import yargs from "yargs";
import { ERRORS, Log, SubjektifyError, SubjektifyConfigLoader, SubjektifyContext } from "@subjektifylabs/subjektify-core";
import { init } from "./init";

export const run = async (args: any): Promise<void> => {

    const command = args._[0];
    const commandArgs = args._.slice(1);
    Log.verbose("Running command: " + command + " with args: " + commandArgs.join(","));

    const configLoader = new SubjektifyConfigLoader();

    // If there is no command passed, we branch into two scenarios:
    if (!command) {
        // Prompt the user to create a new namespace if no config exists
        if (!configLoader.configExists()) {
            return init(commandArgs);
        }
        // Or if the user is in a namespace, show the help menu
        else {
            console.log(await yargs.getHelp());
            return;
        }
    }

    // If the command is 'init', initialize a new namespace
    if (command === "init") {
        return init(commandArgs);
    }

    // If the user is not in a namespace, show an error
    if (!configLoader.configExists()) {
        return Promise.reject(new SubjektifyError(ERRORS.GENERAL.NOT_IN_NAMESPACE));
    }

    const ctx = SubjektifyContext.create(command, commandArgs);
}
