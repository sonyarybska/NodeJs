const path = require('path');
const fs = require('fs/promises');

const dbLink = path.join(process.cwd(), 'users.json');

const readFile = async () => {
    let data = await fs.readFile(dbLink);
    return JSON.parse(data.toString());
};

const writeFile = (data) => fs.writeFile(dbLink, data);

module.exports = {
    getUsers: async (req, res) => {
        const users = await readFile();
        res.json(users);
    },

    getUser: async (req, res) => {
        const users = await readFile();

        res.json(users[req.params.id - 1]);
    },

    postUser: async (req, res) => {
        const users = await readFile();

        users.push({...req.body, id: users.length + 1});

        await writeFile(JSON.stringify(users));

        res.end();
    },

    deleteUser: async (req, res) => {
        const users = await readFile();

        users.splice(+req.params.id - 1, 1);
        users.map((value, index) => value.id = index + 1);

        await writeFile(JSON.stringify(users));

        res.end();
    }
};