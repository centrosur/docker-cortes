"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.docIdGuard = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let docIdGuard = class docIdGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(value) {
        super();
        this.value = value;
        this.name = value;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        this.docId = request.body[this.name];
        return super.canActivate(context);
    }
    handleRequest(err, user, info) {
        const userToken = user;
        console.log('handleRequest ', userToken, this.docId);
        if (userToken) {
            if (userToken.docid == this.docId) {
                return user;
            }
        }
        console.log('acceso denegado');
        throw new common_1.UnauthorizedException({ msg: 'Acceso denegado' });
    }
};
docIdGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], docIdGuard);
exports.docIdGuard = docIdGuard;
//# sourceMappingURL=docId.guard.js.map