import { CommandOptions } from "../base";

export interface CreateOptions extends CommandOptions {
    blueprint?: string;
    install?: boolean;
}

export interface BuildOptions extends CommandOptions {
    watch?: boolean;
}
