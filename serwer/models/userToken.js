'use strict';

const db = require('./db_connect')


const UserTokenSchema = new db.Schema({
    userId: { type: db.Schema.Types.ObjectId, required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 30 * 86400 }, // 30 days
});

module.exports = db.model("UserToken", UserTokenSchema)
