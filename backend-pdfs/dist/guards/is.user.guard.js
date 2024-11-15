"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUserGuard = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let isUserGuard = class isUserGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor() {
        super();
    }
    canActivate(context) {
        return super.canActivate(context);
    }
    async handleRequest(err, user, info) {
        if (user) {
            return user;
        }
        console.log('acceso denegado');
        throw new common_1.UnauthorizedException({ msg: 'Acceso denegado' });
    }
};
isUserGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], isUserGuard);
exports.isUserGuard = isUserGuard;
//# sourceMappingURL=is.user.guard.js.map