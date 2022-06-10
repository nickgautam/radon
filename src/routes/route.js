const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController")
const bookController = require("../controllers/bookController")
const publisherController = require("../controllers/publisherController")


router.post("/createAuthor", authorController.createAuthor)
router.post("/createBook", bookController.createBook)
router.post("/createPublisher", publisherController.createPublisher)
router.get("/getBooksWithcompleteDetails", bookController.getBooksWithcompleteDetails)
router.put("/updateisHardCover", bookController.updateisHardCover)
router.put("/updateBookprice", bookController.updateBookprice)
module.exports = router;

