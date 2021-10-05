const path = require('path');
const fs = require('fs/promises');

const dbLink = path.join(__dirname, '..', 'users.json');

const readFile = () => fs.readFile(dbLink);
const writeFile = (data) => fs.writeFile(dbLink, data);

module.exports = {
    getUsers: async (req, res) => {
        const users = await readFile();

        res.json(JSON.parse(users.toString()));
    },
    getUser: async (req, res) => {
        const users = await readFile();
        const parse = JSON.parse(users.toString());

        res.json(parse[req.params.id]);
    },
    postUser: async (req, res) => {
        const users = await readFile();
        const parse = JSON.parse(users.toString());

        parse.push({...req.body, id: parse.length + 1});

        res.end();
    },
    deleteUser: async (req, res) => {
        const users = await readFile();
        const parse = JSON.parse(users.toString());

        parse.splice(+req.params.id - 1, 1);
        parse.map((value, index) => value.id = index + 1);

        await writeFile(JSON.stringify(parse));

        res.end();
    }
};