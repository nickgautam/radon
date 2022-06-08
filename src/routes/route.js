const express = require('express');
const router = express.Router();
const authorController= require("../controllers/authorController");
const bookController= require("../controllers/bookController");

router.post("/createAuthor", authorController.createAuthor )

router.post("/createBook", bookController.createBook  )

router.get("/listOutBooks", authorController.listOutBooks )

router.get("/authorOfTwoStates", authorController.authorOfTwoStates )

router.get("/bookByCost", authorController.bookByCost )

module.exports = router;
