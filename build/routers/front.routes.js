"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const front_controller_1 = require("../controllers/front.controller");
const router = (0, express_1.Router)();
router.get('/', front_controller_1.getUserList);
exports.default = router;
