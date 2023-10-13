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
        console.log(`[DEBUG] ${message}`.yellow.italic);
    }
}
