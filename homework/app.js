const fs = require('fs');
const path = require('path');

const boys = path.join(__dirname, 'users', 'boys');
const girls = path.join(__dirname, 'users', 'girls');



////////////////////////////////////////1 спосіб///////////////////////////////////////////


const genderSort = (linkToCurrentDir, gender, moveTo) => {
    fs.readdir(linkToCurrentDir, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        data.forEach(value => {
            fs.readFile(path.join(linkToCurrentDir, value), (err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }

                const users = JSON.parse(data.toString());

                if (users.gender === gender) {

                    fs.rename(path.join(linkToCurrentDir, value), path.join(moveTo, value), () => {
                        if (err) {
                            console.log(err);
                        }
                    });
                }
            });
        });
    });
};




genderSort(girls, 'male', boys);
genderSort(boys, 'female', girls);

