import { Log } from "@subjektifylabs/subjektify-core"

export const run = async (args: (string | number)[]): Promise<void> => {
    Log.info(args.toString());
}
