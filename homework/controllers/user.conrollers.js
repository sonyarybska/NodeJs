const path = require('path');
const fs = require('fs/promises');

const dbLink = path.join(process.cwd(), 'users.json');

const readFile = async () => {
    let data = await fs.readFile(dbLink);
    return JSON.parse(data.toString());
};

const writeFile = async (data) => {
    const string = JSON.stringify(data);

    const dataFile = await fs.writeFile(dbLink, string);

    return dataFile;
};

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

        users.sort((a, b) => {
            return a.id - b.id;
        });

        const last = users[users.length - 1].id;

        users.push({...req.body, id: last + 1});

        await writeFile(users);

        res.end();
    },

    deleteUser: async (req, res) => {
        const users = await readFile();
        const newUsers = users.filter(value => +req.params.id !== value.id);

        await writeFile(newUsers);

        res.end();
    }
};