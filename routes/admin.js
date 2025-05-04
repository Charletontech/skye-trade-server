const express = require("express");
const multerUpload = require("../middleware/multerFileUpload");
const { admin } = require("../middleware/auth");
const { allUsers } = require("../controllers/admin");

const router = express.Router();

router.get("/all-users", allUsers);

module.exports = router;
