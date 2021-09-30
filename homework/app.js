const fs = require('fs');
const path = require('path');
const boys = path.join(__dirname, 'users', 'boys');
const girls = path.join(__dirname, 'users', 'girls');

////////////////////////////////////////1 спосіб///////////////////////////////////////////


const genderSort = (linkToCurrentDir) => {

    fs.readdir(linkToCurrentDir, (err, data) => {

        if (err) {
            console.log(err);
        }

        data.forEach(value => {
            fs.readFile(path.join(linkToCurrentDir, value), (err, data) => {

                if (err) {
                    console.log(err);
                    return;
                }

                let users = JSON.parse(data.toString());

                if (users.gender === 'female') {

                    fs.rename(path.join(linkToCurrentDir, value), path.join(girls, value), () => {

                        if (err) {
                            console.log(err);
                        }
                    });
                } else {
                    fs.rename(path.join(linkToCurrentDir, value), path.join(boys, value), () => {

                        if (err) {
                            console.log(err);
                        }
                    });
                }
            });
        });
    });
};

genderSort(girls);
genderSort(boys);

