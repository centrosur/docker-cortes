"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortalController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const is_user_guard_1 = require("../guards/is.user.guard");
const auth_portal_service_1 = require("./services/auth.portal.service");
const request_models_1 = require("../auth/models/request.models");
const portal_models_1 = require("./models/portal.models");
let PortalController = class PortalController {
    constructor(authPortalService) {
        this.authPortalService = authPortalService;
    }
    registerUser(request) {
        try {
            return this.authPortalService.registerUser(request);
        }
        catch (error) {
            console.log('error to call function registerUser -> ', error);
            return null;
        }
    }
    refreshToken(data) {
        try {
            return this.authPortalService.refreshToken(data);
        }
        catch (error) {
            console.log('refresh-token ERROR -> ', error);
            return null;
        }
    }
};
tslib_1.__decorate([
    (0, common_1.Post)('register-user'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [portal_models_1.ModelsPortal.REQUEST_REGISTER_USER_PORTAL]),
    tslib_1.__metadata("design:returntype", void 0)
], PortalController.prototype, "registerUser", null);
tslib_1.__decorate([
    (0, common_1.UseGuards)(is_user_guard_1.isUserGuard),
    (0, common_1.Post)('refresh-token'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [request_models_1.REQUEST_LOGIN_USER]),
    tslib_1.__metadata("design:returntype", void 0)
], PortalController.prototype, "refreshToken", null);
PortalController = tslib_1.__decorate([
    (0, common_1.Controller)('portal'),
    tslib_1.__metadata("design:paramtypes", [auth_portal_service_1.AuthPortalService])
], PortalController);
exports.PortalController = PortalController;
//# sourceMappingURL=portal.controller.js.map