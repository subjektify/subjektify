import chalk from "chalk";

export class Log {
  private static debugEnabled: boolean = false;
  private static verboseEnabled: boolean = false;

  static setDebug(debug: boolean) {
    Log.debugEnabled = debug;
  }

  static setVerbose(verbose: boolean) {
    Log.debugEnabled = verbose;
    Log.verboseEnabled = verbose;
  }

  static error(message: string) {
    console.log(chalk.red.bold(`[ERROR] `), message);
  }

  static warn(message: string) {
    console.log(chalk.yellow.bold(`[WARN] `), message);
  }

  static info(message: string) {
    console.log(chalk.blue.bold(`[INFO] `), message);
  }

  static success(message: string) {
    console.log(chalk.green.bold(`[SUCCESS] `), message);
  }

  static debug(message: string) {
    if (!Log.debugEnabled) {
      return;
    }
    console.log(
      chalk.gray.bold(`[DEBUG] `),
      message,
      chalk.gray.italic(Log.pos()),
    );
  }

  static verbose(message: string) {
    if (!Log.verboseEnabled) {
      return;
    }
    console.log(
      chalk.gray.bold(`[VERBOSE] `),
      message,
      chalk.gray.italic(Log.pos()),
    );
  }

  private static pos(): string {
    const stackTrace = new Error().stack;
    const stackTraceLines = stackTrace ? stackTrace.split("\n") : [];
    const callerPositionLine =
      stackTraceLines.length > 3 ? stackTraceLines[3] : "";
    const callerPosition = callerPositionLine.replace(/^\s+at\s+/g, "");
    return callerPosition;
  }
}
