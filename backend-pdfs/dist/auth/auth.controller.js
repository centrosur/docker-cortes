"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const request_models_1 = require("./models/request.models");
const is_user_guard_1 = require("../guards/is.user.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(request) {
        return this.authService.login(request);
    }
    desactivarCuenta(data, request) {
        try {
            return this.authService.desactivarCuenta(data, request.user.user_id);
        }
        catch (error) {
            console.log('change-email ERROR -> ', error);
            return null;
        }
    }
};
tslib_1.__decorate([
    (0, common_1.Post)('/login'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [request_models_1.REQUEST_LOGIN_USER]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(is_user_guard_1.isUserGuard),
    (0, common_1.Post)('desactivar-cuenta'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [request_models_1.REQUEST_DISABLED_ACCOUNT, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "desactivarCuenta", null);
AuthController = tslib_1.__decorate([
    (0, common_1.Controller)('auth'),
    tslib_1.__metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map