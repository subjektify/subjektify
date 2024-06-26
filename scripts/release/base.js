const { execSync } = require('child_process');
const path = require('path');
const chalk = require('chalk');

const filters = [
    'subjektify',
    '@subjektifylabs/'
]

const packages = [
    "subjektify-core",
    "subjektify-build",
    "subjektify-clean",
    "subjektify-codegen",
    //"subjektify-publish",
    //"subjektify-watch",
    "subjektify-toolbox",
];

const sleep = (seconds) => {
    const ms = seconds * 1000;
    console.log(`${chalk.blue('[INFO]')} Waiting for ${seconds} seconds...`);
    return new Promise(resolve => setTimeout(resolve, ms));
}

const updateDependencies = (pkg) => {
}

const incrementVersion = (pkg, type) => {
}

const commitChanges = (pkg) => {
}

const releasePackage = (pkg) => {
}

module.exports = {
    filters,
    packages,
    sleep,
    updateDependencies,
    incrementVersion,
    commitChanges,
    releasePackage
};
