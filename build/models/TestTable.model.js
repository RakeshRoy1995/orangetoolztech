"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidCustomer = exports.InValidCustomer = void 0;
const mongoose_1 = require("mongoose");
const CustomerSchema = new mongoose_1.Schema({
    f_name: {
        type: String,
    },
    L_name: {
        type: String,
    },
    city: {
        type: String,
    },
    town: {
        type: String,
    },
    street_no: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    ip_address: {
        type: String,
    },
}, { timestamps: { createdAt: "created_at" } });
const ValidCustomer = (0, mongoose_1.model)("validcustomer", CustomerSchema);
exports.ValidCustomer = ValidCustomer;
const InValidCustomer = (0, mongoose_1.model)("invalidcustomer", CustomerSchema);
exports.InValidCustomer = InValidCustomer;
