const {responseMessages:{SUCCESSFUL_AUTH}}=require('../constans');

module.exports = {
    authUsers: (req, res) => {
        try {
            res.json(SUCCESSFUL_AUTH(req.body.email).message).status(SUCCESSFUL_AUTH.code);
        } catch (e) {
            res.json(e.message);
        }
    }
};
