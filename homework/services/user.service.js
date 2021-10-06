const path = require('path');
const fs = require('fs/promises');

const dbLink = path.join(process.cwd(), 'users.json');

const readFile = async () => {
    let data = await fs.readFile(dbLink);

    return JSON.parse(data.toString());
};

const writeFile = async (data) => {
    const string = JSON.stringify(data);

    return await fs.writeFile(dbLink, string);
}

module.exports={readFile,writeFile};