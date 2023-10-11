import 'colorts/lib/string';
import fs from 'fs';
import path from 'path';

const build = () => {

    // Get subjektify.json
    const configPath = path.join(process.cwd(), 'subjektify.json');
    if (!fs.existsSync(configPath)) {
        console.log(`Missing "subjektify.json"! Run 'subjektify init <namespace>' to create a default configuration file.`.red.bold);
        return;
    }
    
    console.log(`Subjektify build successful! 🎉`.green.bold);
}

export default build;
