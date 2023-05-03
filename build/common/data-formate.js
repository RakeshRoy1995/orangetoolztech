"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTableFormateObj = exports.ProductTableFormateObj = exports.dataFormate = void 0;
const dataFormate = (dataFormate, dbData, isArray = true) => {
    let data = [];
    if (isArray) {
        dbData.map((d) => {
            let tmpData = {};
            dataFormate.map((data_f) => {
                if (d[data_f.db]) {
                    tmpData[data_f.mine] = d[data_f.db];
                }
            });
            data.push(tmpData);
        });
        return data;
    }
    else {
        let tmpData = {};
        for (const property in dbData) {
            dataFormate.map((data_f) => {
                if (data_f.db == property) {
                    tmpData[data_f.mine] = dbData[property];
                }
            });
        }
        return tmpData;
    }
};
exports.dataFormate = dataFormate;
exports.ProductTableFormateObj = [
    {
        db: "_id",
        mine: "product_id"
    },
    {
        db: "name",
        mine: "product_name"
    },
    {
        db: "description",
        mine: "product_description"
    },
    {
        db: "price",
        mine: "product_price"
    },
    {
        db: "status",
        mine: "product_status"
    },
    {
        db: "image",
        mine: "product_image"
    },
    {
        db: "createdAt",
        mine: "product_created"
    },
    {
        db: "updatedAt",
        mine: "product_updated"
    },
];
exports.UserTableFormateObj = [
    {
        db: "_id",
        mine: "user_id"
    },
    {
        db: "email",
        mine: "user_email"
    },
    {
        db: "verification_token",
        mine: "user_verification_token"
    },
    {
        db: "access_token",
        mine: "user_access_token"
    }
];
