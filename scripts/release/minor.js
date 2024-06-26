const chalk = require("chalk");
const {
    updateDependencies,
    incrementVersion,
    commitChanges,
    releasePackage,
    packages,
    sleep
} = require("./base");

const _minor = async (pkg) => {
    updateDependencies(pkg);
    incrementVersion(pkg);
    commitChanges(pkg);
    releasePackage(pkg);
}

const minor = async () => {
    try {
        for (pkg of packages) {
            _minor(pkg);
            await sleep(30);
        }
    } catch (error) {
        console.error(`${chalk.red('[ERROR]')} Failed to patch packages:`, error);
    }
};

(async () => {
    await minor();
})();
