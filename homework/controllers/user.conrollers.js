const services=require('../services/user.service');

const {readFile,writeFile}=services;

module.exports = {
    getUsers: async (req, res) => {
        const users = await readFile();

        res.json(users);
    },

    getUser: async (req, res) => {
        const users = await readFile();

        const newUsers = users.find(value => +req.params.id === value.id);

        if(newUsers.name){
            return res.json(newUsers);
        }

       return  res.json('There is no such user');
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