const express = require("express");
const router = express.Router();

const controllers = require("../controllers/reposControllers")

router.get("/", controllers.home)
router.get("/blip/", controllers.getAllRepos)
router.get("/blip/:language", controllers.getBlipReposByLang)
router.get("/oldest", controllers.getOldestCSRepos)

module.exports = router
