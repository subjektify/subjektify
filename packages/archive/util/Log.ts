import 'colorts/lib/string';
export class Log {

    static error(message: string) {
        console.log(`[ERROR] ${message}`.red.bold);
    }

    static warn(message: string) {
        console.log(`[WARN] ${message}`.yellow.bold);
    }

    static info(message: string) {
        console.log(`[INFO] ${message}`.cyan.bold);
    }

    static success(message: string) {
        console.log(`[SUCCESS] ${message}`.green.bold);
    }

    static debug(message: string) {
        console.log(`[DEBUG] ${Log.pos()} ${message}`.magenta);
    }

    static verbose(message: string) {
        console.log(`[VERBOSE] ${Log.pos()} ${message}`.grey.italic);
    }

    private static pos(): string {
        const stackTrace = new Error().stack;
        const stackTraceLines = stackTrace ? stackTrace.split('\n') : [];
        const callerPositionLine = stackTraceLines.length > 3 ? stackTraceLines[3] : '';
        const callerPosition = callerPositionLine.replace(/^\s+at\s+/g, '');
        return callerPosition;
    }
}
