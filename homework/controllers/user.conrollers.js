const User=require('../dataBase/User');

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
        await User.create(req.body);

        res.end();
    },

    deleteUser: async (req, res) => {
        const users = await readFile();

        const newUsers = users.filter(value => +req.params.id !== value.id);

        await writeFile(newUsers);

        res.end();
    }
};