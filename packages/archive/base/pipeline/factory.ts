import { Pipeline } from "./pipeline";

export class PipelineFactory {
    static pipeline(name: string): Pipeline {
        switch (name) {
            case 'build':
            case 'compile':
            case 'deploy':
            case 'publish':
            case 'start':
            case 'test':
            default:
                throw new Error(`Unknown pipeline: ${name}`);
        }
    }
}
