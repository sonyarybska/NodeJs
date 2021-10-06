module.exports = {
    getResolve: (req, res) => {
        const {num1, operator, num2} = req.params;
        let summa = '';

        switch (operator) {
            case '+':
                summa = num1 + num2;
                break;
            case '-':
                summa = num1 - num2;
                break;
            case ':':
                summa = num1 / num2;
                break;
            case '*':
                summa = num1 * num2;
                break;
        }

        res.json(num1 + operator + num2 + '=' + summa);
    }
};