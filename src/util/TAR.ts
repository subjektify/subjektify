import tar from "tar";

/**
 * This is a utility class for creating and extracting TAR files.
 */
export class TAR {

    public static create = (sources: string[], destination: string): void => {
        tar.c(
            {
                gzip: true,
                file: destination,
                sync: true
            },
            sources
        );
    }

    public static extract = (source: string, destination: string): void => {
        tar.x(
            {
                file: source,
                sync: true,
                strip: 1
            },
            [destination]
        );
    }

    public static list = (source: string): string[] => {
        const filenames: string[] = []
        
        tar.t({
          file: source,
          onentry: entry => filenames.push(entry.path),
          sync: true
        });

        return filenames;
    }

    public static update = (sources: string[], destination: string) => {
        tar.u(
            {
                gzip: true,
                file: destination,
                sync: true
            },
            sources
        );
    }
}
