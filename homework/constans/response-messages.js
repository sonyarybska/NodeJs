module.exports = {
    ADD_USER: {
        message: 'User is added',
        code: 201
    },

    UPDATE_USER: {
        message: 'User is updated!',
        code: 201
    },

    SUCCESSFUL_AUTH: (email) => ({
        message: `Welcome ${email}`,
        code: 201
    })
};
