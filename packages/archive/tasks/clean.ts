import { Log, task } from "..";

task('clean', "Clears the cache and deletes all artifacts", async (options, runtime) => {
    Log.info('Cleaning...');
});
