const { Router } = require('express');
const router = Router();
const { check } = require("express-validator");
const {requestValidate} = require("../middlewares/request-validate");

const { show, store } = require("../controllers/postController");

router.get("/", show);

router.post("/", [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("author", "El autor es obligatorio").not().isEmpty(),
    check("content", "El contenido es obligatorio").not().isEmpty(),
    requestValidate
], store);


module.exports = router