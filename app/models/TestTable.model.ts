/** @format */

import { Schema, Document, model } from "mongoose";

const CustomerSchema = new Schema(
  {
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
  },
  { timestamps: { createdAt: "created_at" } }
);

const ValidCustomer = model<any>("validcustomer", CustomerSchema);
const InValidCustomer = model<any>("invalidcustomer", CustomerSchema);
export {InValidCustomer,  ValidCustomer };
