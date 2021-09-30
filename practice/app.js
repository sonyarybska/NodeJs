const users = [
    {name: "Maks", gender: "male", age: 21},
    {name: "Anna", gender: "female", age: 17},
    {name: "Oksana", gender: "female", age: 26},
    {name: "Nazar", gender: "male", age: 19},
    {name: "Oleg", gender: "male", age: 18},
    {name: "Veronika", gender: "female", age: 22},
    {name: "Rita", gender: "female", age: 29},
    {name: "Igor", gender: "male", age: 15},
    {name: "Sofia", gender: "female", age: 24},
    {name: "Julia", gender: "female", age: 16}
]

const fs = require('fs');
const path = require('path');
const manOlder20 = path.join(__dirname, 'manOlder20');
const manYounger20 = path.join(__dirname, 'manYounger20');
const womanYounger20 = path.join(__dirname, 'womanYounger20');
const womanOlder20 = path.join(__dirname, 'womanOlder20');

users.forEach(user => {

    if (user.gender === 'male' && user.age > 20) {
        fs.writeFile(path.join(manOlder20, `${user.name.toString()}.txt`), JSON.stringify(user), (err) => {

            if (err) {
                console.log(err);
            }

        })
        return '';
    }

    if (user.gender === 'male' && user.age < 20) {
        fs.writeFile(path.join(manYounger20, `${user.name.toString()}.txt`), JSON.stringify(user), (err) => {

            if (err) {
                console.log(err);
            }

        })
        return '';
    }

    if (user.gender === 'female' && user.age > 20) {
        fs.writeFile(path.join(womanOlder20, `${user.name.toString()}.txt`), JSON.stringify(user), (err) => {

            if (err) {
                console.log(err);
            }

        })
        return '';
    }

    if (user.gender === 'female' && user.age < 20) {
        fs.writeFile(path.join(womanYounger20, `${user.name.toString()}.txt`), JSON.stringify(user), (err) => {

            if (err) {
                console.log(err);
            }

        })
        return '';
    }

});