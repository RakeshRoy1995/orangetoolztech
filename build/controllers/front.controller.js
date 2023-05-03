"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserList = void 0;
const logger_1 = __importDefault(require("../config/logger"));
const TestTable_model_1 = require("../models/TestTable.model");
const fs = require("fs");
const util_1 = require("../utils/util");
const NAMESPACE = "Front Controller";
const getUserList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { invalid, skip, serach } = req.query;
        let limit = 100;
        skip = skip * 100 || 0;
        if (invalid) {
            let data = yield TestTable_model_1.InValidCustomer.find({}).limit(limit).skip(skip);
            let count = yield TestTable_model_1.InValidCustomer.count();
            return res.render('index', { data, customer: "Invalid", count });
        }
        let count = yield TestTable_model_1.ValidCustomer.count();
        let queryOBJ = {};
        if (serach) {
            queryOBJ = {
                $or: [
                    { phone: { $regex: serach, $options: "i" }, },
                    { email: { $regex: serach, $options: "i" }, },
                    { f_name: { $regex: serach, $options: "i" }, },
                    { L_name: { $regex: serach, $options: "i" }, },
                ],
            };
        }
        let data = yield TestTable_model_1.ValidCustomer.find(queryOBJ).limit(limit).skip(skip);
        return res.render('index', { data, customer: "Valid", count });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, "Error getting users", err);
        return res.status(500).json((0, util_1.formatError)("Server error"));
    }
});
exports.getUserList = getUserList;
