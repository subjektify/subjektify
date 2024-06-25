const { execSync } = require('child_process');
const path = require('path');

const packages = [
    "subjektify-core",
    "subjektify-build",
    "subjektify-clean",
    "subjektify-codegen",
    //"subjektify-publish",
    //"subjektify-watch",
    "subjektify-toolbox",
];

function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, 1000*s));
 }

const updateDependencies = (pkg) => {
    console.log(`Updating dependencies for ${pkg}...`);
    try {
        execSync(`pnpm -r update`);
    } catch (error) {
        console.error(`Failed to update dependencies for ${pkg}:`, error);
        throw error;
    }
    console.log(`Dependencies updated for ${pkg}.`);
};

const incrementVersion = (pkg) => {
    try {
        console.log(`Incrementing version for ${pkg}...`);
        execSync(`pnpm version patch`, {
            stdio: 'inherit',
            cwd: path.resolve(process.cwd(), `packages`, pkg)
        });
    } catch (error) {
        console.error(`Failed to increment version for ${pkg}:`, error);
        throw error;
    }
    console.log(`Version incremented for ${pkg}.`);
};

const commitChanges = (pkg) => {
    try {
        console.log(`Committing changes for ${pkg}...`);
        execSync(`git add .`);
        execSync(`git commit -m "chore(${pkg}): update dependencies and bump version"`);
    } catch (error) {
        console.error(`Failed to commit changes for ${pkg}:`, error);
        throw error;
    }
    console.log(`Changes committed for ${pkg}.`);
};

const releasePackage = (pkg) => {
    try {
        console.log(`Releasing ${pkg}...`);
        execSync(`pnpm release`);
    } catch (error) {
        console.error(`Failed to release ${pkg}:`, error);
        throw error;
    }
    console.log(`${pkg} released.`);
};



const _patch = async (pkg) => {
    updateDependencies(pkg);
    incrementVersion(pkg);
    commitChanges(pkg);
    releasePackage(pkg);
}

const patch = async () => {
    try {
        for (pkg of packages) {
            _patch(pkg);
            console.log(`Waiting for 30 seconds...`);
            await sleep(30);
        }
    } catch (error) {
        console.error(`Failed to patch packages:`, error);
    }
};

(async () => {
    await patch();
})();
