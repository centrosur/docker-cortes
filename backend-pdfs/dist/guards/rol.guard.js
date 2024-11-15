"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolGuard = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let rolGuard = class rolGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(rolAdmit) {
        super();
        this.rolAdmit = rolAdmit;
        this.rol = rolAdmit;
    }
    canActivate(context) {
        return super.canActivate(context);
    }
    handleRequest(err, user, info) {
        const userToken = user;
        if (userToken) {
            if (userToken.roles) {
                const isCliente = userToken.roles.find(rolUser => { return rolUser == this.rol; });
                if (isCliente) {
                    return user;
                }
            }
        }
        console.log('acceso denegado');
        throw new common_1.UnauthorizedException({ msg: 'Acceso denegado' });
    }
};
rolGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], rolGuard);
exports.rolGuard = rolGuard;
//# sourceMappingURL=rol.guard.js.map