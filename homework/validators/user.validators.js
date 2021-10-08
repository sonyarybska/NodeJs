const bcrypt = require('bcrypt');

module.exports = {
    hesh: (password) => bcrypt.hesh(password,10),
    comparing:(password,heshPassword)=>bcrypt.compare(password,heshPassword)
};
