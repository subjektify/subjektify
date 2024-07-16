const chalk = require("chalk");
const { release } = require("./base");

const minor = async () => {
  try {
    release("minor");
  } catch (error) {
    console.error(
      `${chalk.red("[ERROR]")} Failed to release minor version:`,
      error,
    );
  }
};

(async () => {
  await minor();
})();
