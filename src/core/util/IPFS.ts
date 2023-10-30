import { unixfs } from '@helia/unixfs'
import { FsBlockstore } from 'blockstore-fs';
import { createHelia } from 'helia';

/**
 * This is a utility class for interacting with IPFS.
 * More on networking https://github.com/ipfs-examples/helia-examples/blob/main/examples/helia-101/README.md#301---networking
 */
export class IPFS {

    /**
     * This method adds a file to IPFS.
     * @param path The path of the file to add.
     * @returns The IPFS hash of the file.
     */
    public static add = async (path: string): Promise<string> => {

        // the blockstore is where we store the blocks that make up files.
        const blockstore = new FsBlockstore(path);

        // create a Helia node
        const helia = await createHelia({
          blockstore
        });
        
        // create a filesystem on top of Helia, in this case it's UnixFS
        const fs = unixfs(helia);
        
        // we will use this TextEncoder to turn strings into Uint8Arrays
        const encoder = new TextEncoder();

        const input = "Hello World!";

        const cid = await fs.addBytes(encoder.encode(input));

        return cid.toString();
    }
}
