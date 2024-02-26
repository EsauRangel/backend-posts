const { express } = require('express');
const { validationResult } = require("express-validator")


const requestValidate = (req, res = express.response, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            msg: errors.mapped()
        });
    }

    next();
}


module.exports = {
    requestValidate,
}