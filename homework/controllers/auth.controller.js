module.exports = {
    authUsers: (req, res) => {
        try {
            res.json(`Welcome ${req.body.email}`);
        } catch (e) {
            res.json(e.message);
        }
    }
};
