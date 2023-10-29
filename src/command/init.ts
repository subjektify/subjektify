import { InitModule } from "../core/modules/init/module"

export const initCommand = (name: string) => {
    const module = new InitModule();
    module.init(name);
}
