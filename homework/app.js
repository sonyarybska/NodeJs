const fs = require('fs');
const path = require('path')
const boys = path.join(__dirname,'users', 'boys');
const girls = path.join(__dirname,'users', 'girls');

////////////////////////////////////////1 спосіб///////////////////////////////////////////

fs.readdir(boys, (err, data) => {

    if (err) {
        console.log(err);
    }

    data.forEach(value => {
        fs.readFile(path.join(boys, value), (err, data) => {

            if (err) {
                console.log(err);
                return;
            }

            let users = JSON.parse(data.toString());

            users.gender === 'female' ? fs.rename(path.join(boys, value), path.join(girls, value), () => {

                    if (err) {
                        console.log(err);
                    }
                }) :
                null;
        });
    });
});

fs.readdir(girls, (err, data) => {

    if (err) {
        console.log(err);
        return;
    }


    data.forEach(value => {
        fs.readFile(path.join(girls, value), (err, data) => {

            if (err) {
                console.log(err);
            }

            let users = JSON.parse(data.toString());

            users.gender === 'male' ?
                fs.rename(path.join(girls, value), path.join(boys, value), (err) => {

                    if (err) {
                        console.log(err);
                    }
                }) :
                null;
        });
    });
});

/////////////////////////////////2 спосіб////////////////////////////////
// let usersFile = path.join(__dirname, 'users');
//
// fs.readdir(usersFile, (err, data) => {
//
//     if (err) {
//         console.log(err);
//         return;
//     }
//
//     data.forEach(genderDirs => {
//
//         const dirs = path.join(usersFile, genderDirs);
//
//         fs.readdir(dirs, (err, data) => {
//
//             if (err) {
//                 console.log(err);
//                 return;
//             }
//
//             data.forEach(files => {
//
//                 fs.readFile(path.join(dirs, files), (err, data) => {
//
//                     if (err) {
//                         console.log(err);
//                         return;
//                     }
//
//                     let users = JSON.parse(data.toString());
//
//                     users.gender === 'male' ?
//
//                         fs.rename(path.join(usersFile, 'girls', files), path.join(usersFile, 'boys', files), (err) => {
//
//                             if (err) {
//                                 console.log(err);
//                             }
//                         }) :
//
//                         fs.rename(path.join(usersFile, 'boys', files), path.join(usersFile, 'girls', files), (err) => {
//
//                             if (err) {
//                                 console.log(err);
//                             }
//                         });
//                 });
//             });
//         });
//     });
// });