import { Log } from "@subjektifylabs/subjektify-core";
import { Prompt } from "./prompt";

export const init = async (args: any): Promise<void> => {
    Log.debug("Initializing a new namespace.");
    const choices = [
        { message: "Create a Javascript namespace", name: "js" },
        { message: "Create a Typescript namespace", name: "ts" },
        { message: "Create an empty subjektify.config.js", name: "empty" }
    ]

    const answer = await Prompt.select("What do you want to do?", choices);
    Log.verbose("User selected: " + answer);

    const name = await Prompt.input("Enter a name for the new namespace:");
    Log.debug("Creating a new namespace with name: " + name);
}
