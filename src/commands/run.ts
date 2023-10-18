import { BuildPipeline } from "../pipelines";
import { Command } from "../types";

export const runCommand = (commandName: string) => {
    let command: Command;
  
    switch (commandName) {
      case 'build':
        command = new BuildPipeline();
        break;
      case 'compile':
        command = new BuildPipeline();
        break;
      case 'deploy':
        command = new BuildPipeline();
        break;
      case 'publish':
        command = new BuildPipeline();
        break;
      case 'test':
        command = new BuildPipeline();
        break;
      // Add more cases for other commands as needed
      default:
        throw new Error(`Unknown command: ${commandName}`);
    }
  
    command.run();
  };