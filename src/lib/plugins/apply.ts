import { Context, IPlugin } from '../../types';
import { Log } from '../../util';

export const applyPluginsInContext = (plugins: IPlugin[], context: Context): void => {
    Log.verbose(`Applying plugins...`);
    plugins.forEach(plugin => {
        applyPlugin(plugin, context);
    });
}

export const applyPlugin = (plugin: IPlugin, context: Context): void => {
    const target = plugin.target();
    const apply = plugin.apply;
    if (context.commandTarget === target) {
        apply(context);
    } else {
        Log.verbose(`Plugin target "${target}" does not match command target "${context.commandTarget}". Skipping plugin.`);
    }
}
