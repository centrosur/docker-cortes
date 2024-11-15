"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const bcryptjs_1 = require("bcryptjs");
const uuid_1 = require("uuid");
const moment = require("moment");
class Account {
    constructor(data, id = (0, uuid_1.v4)()) {
        this.id = id;
        if (data) {
            this.username = data.username;
            this.password = data.password;
        }
        this.enable = 1;
    }
    async hashPasword() {
        if (!this.password)
            return;
        this.password = await (0, bcryptjs_1.hash)(this.password, 10);
    }
    setTokenToValidEmailOrPhone(time = 5) {
        const codigo = +(Math.random() * (9999 - 1000) + 1000).toFixed(0);
        const now = moment(new Date());
        now.add(time, 'minutes');
        this.token = codigo;
        this.expired = now.format('YYYY-MM-DD HH:mm:ss.000000');
    }
}
exports.Account = Account;
//# sourceMappingURL=auth.models.js.map