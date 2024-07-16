const chalk = require("chalk");
const { release } = require("./base");

const patch = async () => {
  try {
    release("patch");
  } catch (error) {
    console.error(
      `${chalk.red("[ERROR]")} Failed to release patch version:`,
      error,
    );
  }
};

(async () => {
  await patch();
})();
