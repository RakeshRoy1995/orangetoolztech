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
exports.download = exports.importCustomer = void 0;
const http = require('http');
const logger_1 = __importDefault(require("../config/logger"));
const TestTable_model_1 = require("../models/TestTable.model");
const fs = require("fs");
const { serialize } = require('v8');
const util_1 = require("../utils/util");
const NAMESPACE = "User Controller";
const NS_PER_SEC = 1e9;
const MS_PER_NS = 1e-6;
let current_size = 0;
const importCustomer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const time = process.hrtime();
        yield TestTable_model_1.InValidCustomer.deleteMany({});
        yield TestTable_model_1.ValidCustomer.deleteMany({});
        // create a readable stream to read from the file
        const stream = fs.createReadStream("public/1M-customers.txt", {
            encoding: "utf8",
        });
        // listen for the 'data' event on the stream
        let validCustomer = [];
        let InvalidCustomer = [];
        stream.on("data", (chunk) => {
            let chunk_SIZE = serialize(chunk).byteLength;
            current_size += chunk_SIZE;
            const stats = fs.statSync('public/1M-customers.txt');
            let percentage = (current_size * 100) / stats.size;
            console.log(`done = `, percentage, "% file size =", stats.size, " current ", current_size);
            var makeDataRow = chunk.split(/\r?\n|\r|\n/g);
            makeDataRow.map((d, k) => {
                let data = d.split(",");
                if (data.length == 8) {
                    let obj = {
                        f_name: data[0],
                        L_name: data[1],
                        city: data[2],
                        town: data[3],
                        street_no: data[4],
                        phone: data[5],
                        email: data[6],
                        ip_address: data[7],
                    };
                    //check valid customer baseed on US country phone number
                    let checkNumber = (0, util_1.formatPhoneNumber)(data[5]);
                    if (checkNumber) {
                        validCustomer.push(obj);
                    }
                    else {
                        InvalidCustomer.push(obj);
                    }
                }
            });
        });
        // listen for the 'end' event on the stream
        stream.on("end", () => __awaiter(void 0, void 0, void 0, function* () {
            // Create a Set of unique array based on a phone field
            validCustomer = (0, util_1.uniqueArrayBaseOnPhoneNumber)(validCustomer);
            let stream2 = fs.createWriteStream("public/validCustomer.json");
            stream2.write(JSON.stringify(validCustomer));
            InvalidCustomer = (0, util_1.uniqueArrayBaseOnPhoneNumber)(InvalidCustomer);
            let stream3 = fs.createWriteStream("public/InvalidCustomer.json");
            stream3.write(JSON.stringify(InvalidCustomer));
            // add to database
            yield TestTable_model_1.InValidCustomer.insertMany(InvalidCustomer);
            yield TestTable_model_1.ValidCustomer.insertMany(validCustomer);
            const diff = process.hrtime(time);
            let exec_time = `Process took ${(diff[0] * NS_PER_SEC + diff[1]) * MS_PER_NS} milliseconds`;
            return res.status(200).json((0, util_1.formatSuccess)(exec_time));
        }));
        // listen for the 'error' event on the stream
        stream.on("error", (err) => {
            console.error(`An error occurred: ${err}`);
            return res.status(500).json((0, util_1.formatError)("Server error"));
        });
    }
    catch (err) {
        logger_1.default.error(NAMESPACE, "Error getting users", err);
        return res.status(500).json((0, util_1.formatError)("Server error"));
    }
});
exports.importCustomer = importCustomer;
const download = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { type } = req.query;
    const PORT = process.env.PORT;
    let fileUrl = ` http://localhost:${PORT}/InvalidCustomer.json `;
    if (type === "Valid") {
        fileUrl = ` http://localhost:${PORT}/validCustomer.json `;
    }
    const downloadPath = 'public/download.json';
    const file = fs.createWriteStream(downloadPath);
    http.get(fileUrl, (response) => {
        response.pipe(file);
        file.on('finish', () => {
            file.close();
            console.log(`Downloaded ${downloadPath}`);
        });
    }).on('error', (error) => {
        console.error(`Error downloading ${fileUrl}: ${error}`);
    });
});
exports.download = download;
