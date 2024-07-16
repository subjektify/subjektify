import { Log } from "../util";
import { Prompt } from "./prompt";

export const init = async (args: any): Promise<void> => {
  Log.verbose("Initializing a new namespace.");
  const answer = await promptChoice();

  switch (answer) {
    case "javascript":
      return createJavascriptNamespace();
    case "typescript":
      return createTypescriptNamespace();
    case "empty":
      return createEmptyConfig();
    case "quit":
      Log.verbose("Quitting...");
      return;
  }
};

const promptChoice = async () => {
  const choices = [
    { message: "Create a Javascript namespace", name: "javascript" },
    { message: "Create a Typescript namespace", name: "typescript" },
    { message: "Create an empty subjektify.config.js", name: "empty" },
    { message: "Quit", name: "quit" },
  ];

  const answer = await Prompt.select("What do you want to do?", choices);
  Log.verbose(`User selected: ${answer}`);
  return answer;
};

const promptNamespace = async () => {
  const namespace =
    (await Prompt.input("Enter a name for the new namespace:")) ||
    "my-namespace";
  Log.verbose(`Selected namespace: ${namespace}`);
  return namespace;
};

const createJavascriptNamespace = async () => {
  Log.verbose("Creating a new Javascript namespace.");
  const namespace = await promptNamespace();
  // Create a new namespace with a default configuration
};

const createTypescriptNamespace = async () => {
  Log.verbose("Creating a new Typescript namespace.");
  const namespace = await promptNamespace();
  // Create a new namespace with a default configuration
};

const createEmptyConfig = async () => {
  Log.verbose("Creating an empty configuration file.");
};
