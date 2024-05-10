import { CommandOptions } from "../base";

export interface CreateOptions extends CommandOptions {
    blueprint?: string;
    plugin?: boolean;
}
