import { Command } from '../types';
import { BuildPipeline } from '../pipelines';

export const buildCommand = () => {
    const command: Command = new BuildPipeline();
    command.run();
}
