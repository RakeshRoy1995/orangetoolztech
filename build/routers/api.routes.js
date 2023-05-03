"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_controller_1 = require("../controllers/api.controller");
const router = (0, express_1.Router)();
router.get('/all', api_controller_1.importCustomer);
router.post('/file-download', api_controller_1.download);
exports.default = router;
