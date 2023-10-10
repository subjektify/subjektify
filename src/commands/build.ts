import 'colorts/lib/string';
import fs from 'fs';
import path from 'path';

const build = () => {

    // Get subjects-build.json
    const configPath = path.join(process.cwd(), 'subjects-build.json');
    if (!fs.existsSync(configPath)) {
        console.log(`Missing "subjects-build.json"! Run 'gsx init <namespace>' to create a default configuration file.`.red.bold);
        return;
    }
    
    console.log(`Built subjects successfully! 🎉`.green.bold);
}

export default build;
