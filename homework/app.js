const express = require("express");
const fs = require("fs");
const path = require('path');
const expressHbs = require("express-handlebars");

const staticFile = path.join(__dirname, 'public');
const users = path.join(__dirname, 'users.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(staticFile));


app.set('view engine', '.hbs');
app.set('views', staticFile);

app.engine('.hbs', expressHbs({
    defaultLayout: false
}));


fs.readFile(users, ((err, data) => {
    if (!data.toString()) {
        fs.writeFile(users, JSON.stringify([]), (err) => {
            if (err) {
                console.log(err);
                return err;
            }

        });
    }
}));

app.get('/', (req, res) => {
    res.render('welcome');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/registration', (req, res) => {
    res.render('registration');
});

app.get('/users', (req, res) => {
    fs.readFile(users, (err, data) => {
        if (err) {
            return err;
        }

        const arrayUsers = JSON.parse(data.toString());

        res.render('users', {users: arrayUsers});
    });
});

app.get('/users/:username', (req, res) => {
    fs.readFile(users, (err, data) => {
        if (err) {
            return err;
        }

        const arrayUsers = JSON.parse(data.toString());

        const user = arrayUsers.find(value => value.username === req.params.username);

        res.render('user', {user: user});
    });
});

app.post('/login', (req, res) => {
    fs.readFile(users, ((err, data) => {

        const arrayUsers = JSON.parse(data.toString());

        const validation = arrayUsers.find(value => value.username === req.body.username && value.password === req.body.password);

        if (validation) {
            return res.redirect(`users/${req.body.username}`);
        }

        return res.render("error", {error: 'The password or name is incorrect',type:'logination'});
    }));
});

app.post('/registration', (req, res) => {
    fs.readFile(users, ((err, data) => {

        const arrayUsers = JSON.parse(data.toString());

        const validation = arrayUsers.find(value => value.username === req.body.username);

        if (validation) {
            return res.render('error', {error: 'Such an username already exists',type:'registration'});
        } else {
            arrayUsers.push(req.body);
        }

        fs.writeFile(users, JSON.stringify(arrayUsers), (err) => {
            if (err) {
                console.log(err);
                return err
            }

            return res.redirect(`users/${req.body.username}`);
        });
    }));
});


app.listen(3000, () => {
    console.log('App listen 3000');
});

