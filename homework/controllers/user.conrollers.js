const path = require('path');
const fs = require('fs/promises');

// const dbLink = path.join(__dirname, '..', 'users.json');
const dbLink = path.join(process.cwd(), 'users.json');   // TODO можна замінити на такий запис

const readFile = () => {
    return fs.readFile(dbLink);                          // TODO парси дані тут, а не в кожному методі
};

const writeFile = (data) => fs.writeFile(dbLink, data);

const parseData=(data)=>{                                // TODO вирівнюй код Ctrl+Alt+L
    return JSON.parse(data.toString());
}

module.exports = {
    getUsers: async (req, res) => {
        const users = await readFile();
        res.json(JSON.parse(users.toString()));
    },                                                   // TODO після цьго рядка ентер
    getUser: async (req, res) => {
        const users = await readFile();
        const parse = parseData(users);

        res.json(parse[req.params.id-1]);
    },                                                   // TODO після цьго рядка ентер
    postUser: async (req, res) => {
        const users = await readFile();
        const parse = parseData(users);

        parse.push({...req.body, id: parse.length + 1});

        await writeFile(JSON.stringify(parse));

        res.end();
    },                                                   // TODO після цьго рядка ентер
    deleteUser: async (req, res) => {
        const users = await readFile();
        const parse = parseData(users);

        parse.splice(+req.params.id - 1, 1);
        parse.map((value, index) => value.id = index + 1);

        await writeFile(JSON.stringify(parse));

        res.end();
    }
};
