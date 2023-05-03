import { Request, Response } from "express";
import logger from "../config/logger";
import { InValidCustomer, ValidCustomer } from "../models/TestTable.model";
const fs = require("fs");
import { formatError } from "../utils/util";
const NAMESPACE = "Front Controller";

export const getUserList = async (req: Request, res: Response) => {
  try {
    let {invalid , skip , serach }:any = req.query
    let limit = 100
    skip = skip *100 || 0
    if (invalid) {
      let data = await InValidCustomer.find({}).limit(limit).skip(skip)
      let count = await InValidCustomer.count()
      return res.render('index', {data , customer : "Invalid" , count});
    }
    let count = await ValidCustomer.count()
    let queryOBJ = {}

    if (serach) {

      queryOBJ = {
        $or: [
          { phone: { $regex: serach, $options: "i" },  },
          { email: { $regex: serach, $options: "i" },  },
          { f_name: { $regex: serach, $options: "i" },  },
          { L_name: { $regex: serach, $options: "i" },  },
        ],
      }
      
    }

    let data = await ValidCustomer.find(queryOBJ).limit(limit).skip(skip)
    return res.render('index', {data , customer : "Valid" , count});
     
  } catch (err: any) {
    logger.error(NAMESPACE, "Error getting users", err);
    return res.status(500).json(formatError("Server error"));
  }
};
