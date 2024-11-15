"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenGuard = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let getTokenGuard = class getTokenGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor() {
        super();
    }
    canActivate(context) {
        return super.canActivate(context);
    }
    async handleRequest(err, user, info) {
        if (!user) {
            user = null;
        }
        return user;
    }
};
getTokenGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], getTokenGuard);
exports.getTokenGuard = getTokenGuard;
//# sourceMappingURL=get.token.guard.js.map