const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

// Lookup table for package names and their respective locations in the monorepo
const locations = {
    'subjektify': 'subjektify-core',
    '@subjektifylabs/subjektify-build': 'subjektify-build',
    '@subjektifylabs/subjektify-clean': 'subjektify-clean',
    '@subjektifylabs/subjektify-codegen': 'subjektify-codegen',
    '@subjektifylabs/subjektify-toolbox': 'subjektify-toolbox',
}

// Filters to match dependencies that need to be updated
const filters = [
    'subjektify',
    '@subjektifylabs/*'
]

// List of packages to release
const packages = [
    "subjektify-core",
    "subjektify-build",
    "subjektify-clean",
    "subjektify-codegen",
    //"subjektify-publish",
    //"subjektify-watch",
    "subjektify-toolbox",
];

// Because this is an adhoc process, we can wait for a few seconds to give NPM time to update the packages in the registry
const sleep = (seconds) => {
    console.log(`${chalk.yellow('[DEBUG]')} Waiting for ${seconds} seconds...`);
    const ms = seconds * 1000;
    return new Promise(resolve => setTimeout(resolve, ms));
}


// pnpm does not update peer dependencies when running `pnpm update`, since we only use peer dependencies in our packages, we need to manually update them
const updateDependencies = (pkg) => {
    console.log(`${chalk.yellow('[DEBUG]')} Updating dependencies for ${pkg}...`);

    const packageJsonPath = path.resolve(process.cwd(), `packages`, pkg, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    const peerDependencies = packageJson.peerDependencies;
    const filteredDependencies = Object.keys(peerDependencies).filter(dep => filters.some(filter => dep.includes(filter)));

    console.log(`${chalk.yellow('[DEBUG]')} Filtered dependencies:`, filteredDependencies);

    for (dep of filteredDependencies) {
        const location = locations[dep];

        const depPackageJsonPath = path.resolve(process.cwd(), `packages`, location, 'package.json');
        const depPackageJson = JSON.parse(fs.readFileSync(depPackageJsonPath, 'utf8'));
        const depVersion = depPackageJson.version;

        peerDependencies[dep] = depVersion;
    }

    packageJson.peerDependencies = peerDependencies;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    try {
        execSync(`pnpm update`, {
            stdio: 'inherit',
            cwd: path.resolve(process.cwd(), `packages`, pkg)
        });
    } catch (error) {
        console.error(`${chalk.red('[ERROR]')} Failed to update dependencies for ${pkg}:`, error);
        throw error;
    }
    console.log(`${chalk.green('[SUCCESS]')} Dependencies updated for ${pkg}.`);
}

const incrementVersion = (pkg, type) => {
    console.log(`${chalk.yellow('[DEBUG]')} Incrementing version for ${pkg}...`);
    try {
        execSync(`pnpm version ${type}`, {
            stdio: 'inherit',
            cwd: path.resolve(process.cwd(), `packages`, pkg)
        });
    } catch (error) {
        console.error(`${chalk.red('[ERROR]')} Failed to increment version for ${pkg}:`, error);
        throw error;
    }
    console.log(`${chalk.green('[SUCCESS]')} Version incremented for ${pkg}.`);
}

const commitChanges = (pkg) => {
    console.log(`${chalk.yellow('[DEBUG]')} Committing changes for ${pkg}...`);
    try {
        execSync(`git add .`);
        execSync(`git commit -m "chore(${pkg}): update dependencies and bump version"`);
        execSync(`git push`);
    } catch (error) {
        console.error(`${chalk.red('[ERROR]')} Failed to commit changes for ${pkg}:`, error);
        throw error;
    }
    console.log(`${chalk.green('[SUCCESS]')} Changes committed for ${pkg}.`);
}

const publishPackage = (pkg) => {
    console.log(`${chalk.yellow('[DEBUG]')} Releasing ${pkg}...`);
    try {
        execSync(`pnpm publish`, {
            stdio: 'inherit',
            cwd: path.resolve(process.cwd(), `packages`, pkg)
        });
    } catch (error) {
        console.error(`Failed to release ${pkg}:`, error);
        throw error;
    }
    console.log(`${pkg} released.`);
}

const _release = async (pkg, type) => {
    console.log(`${chalk.yellow('[DEBUG]')} Releasing ${type} version for ${pkg}...`);
    updateDependencies(pkg);
    incrementVersion(pkg, type);
    commitChanges(pkg);
    publishPackage(pkg, type);
    console.log(`${chalk.green('[SUCCESS]')} Released ${type} version for ${pkg}`);
    await sleep(10);
}

const release = async (type) => {
    for (pkg of packages) {
        await _release(pkg, type);
    }
}

module.exports = {
    release
};
