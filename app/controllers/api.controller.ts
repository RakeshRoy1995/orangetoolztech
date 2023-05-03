import { Request, Response } from "express";
const http = require('http');
import logger from "../config/logger";
import { InValidCustomer, ValidCustomer } from "../models/TestTable.model";
const fs = require("fs");
const { serialize } = require('v8')
import { formatError, formatPhoneNumber, formatSuccess, uniqueArrayBaseOnPhoneNumber } from "../utils/util";
const NAMESPACE = "User Controller";

const NS_PER_SEC = 1e9;
const MS_PER_NS = 1e-6

let current_size = 0

export const importCustomer = async (req: Request, res: Response) => {
  try {
    const time = process.hrtime();

    await InValidCustomer.deleteMany({});
    await ValidCustomer.deleteMany({});

    // create a readable stream to read from the file
    const stream = fs.createReadStream("public/1M-customers.txt", {
      encoding: "utf8",
    });

    // listen for the 'data' event on the stream

    let validCustomer: any = [];
    let InvalidCustomer: any = [];
    stream.on("data", (chunk: any) => {
      let chunk_SIZE = serialize(chunk).byteLength

      current_size += chunk_SIZE

      const stats = fs.statSync('public/1M-customers.txt')

      let percentage = (current_size * 100 )/stats.size

      console.log(`done = `,percentage , "% file size =",  stats.size , " current ", current_size );
      var makeDataRow = chunk.split(/\r?\n|\r|\n/g);
      makeDataRow.map((d: any, k: any) => {
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
          let checkNumber = formatPhoneNumber(data[5]);
          if (checkNumber) {
            validCustomer.push(obj)
          } else {
            InvalidCustomer.push(obj)
          }
        }
      });
    });

    // listen for the 'end' event on the stream
    stream.on("end", async () => {
      // Create a Set of unique array based on a phone field
      validCustomer = uniqueArrayBaseOnPhoneNumber(validCustomer)
      let stream2 = fs.createWriteStream("public/validCustomer.json");
      stream2.write(JSON.stringify(validCustomer));

      InvalidCustomer = uniqueArrayBaseOnPhoneNumber(InvalidCustomer)
      let stream3 = fs.createWriteStream("public/InvalidCustomer.json");
      stream3.write(JSON.stringify(InvalidCustomer));
      
      // add to database
      await InValidCustomer.insertMany(InvalidCustomer);
      await ValidCustomer.insertMany(validCustomer);

      const diff = process.hrtime(time);

      let exec_time = `Process took ${ (diff[0] * NS_PER_SEC + diff[1])  * MS_PER_NS } milliseconds`
      return res.status(200).json(formatSuccess(exec_time));
    });

    // listen for the 'error' event on the stream
    stream.on("error", (err: any) => {
      console.error(`An error occurred: ${err}`);
      return res.status(500).json(formatError("Server error"));
    });

    
  } catch (err: any) {
    logger.error(NAMESPACE, "Error getting users", err);
    return res.status(500).json(formatError("Server error"));
  }
};

export const download = async(req: Request, res: Response)=>{

  let { type }:any = req.query

  const PORT = process.env.PORT
  let fileUrl = ` http://localhost:${PORT}/InvalidCustomer.json `;
  if (type === "Valid") {
     fileUrl = ` http://localhost:${PORT}/validCustomer.json `;
  }
  
  const downloadPath = 'public/download.json';

  const file = fs.createWriteStream(downloadPath);

  http.get(fileUrl, (response:any) => {
    response.pipe(file);

    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${downloadPath}`);
    });
  }).on('error', (error:any) => {
    console.error(`Error downloading ${fileUrl}: ${error}`);
  });


}
