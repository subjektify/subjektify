export class Templates {
    
    static README_TEMPLATE = (name: string) => `# ${name}

This dApp was generated using [Subjektify](https://subjektify.dev).

## Installation

\`\`\`bash
cd ${name}
npm install
\`\`\`

## Usage
`;
    static GITIGNORE_TEMPLATE = `node_modules
`;
}
