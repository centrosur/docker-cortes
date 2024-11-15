"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_service_1 = require("./config.service");
let ConfigController = class ConfigController {
    constructor(configParametersService) {
        this.configParametersService = configParametersService;
    }
    async setParameter(request, response) {
        const data = await this.configParametersService.setParameter(request);
        response.status(200).send(data);
    }
    async getParameter(body, request, response) {
        const res = { status: false, code: 204 };
        const data = await this.configParametersService.getParametersWithValidation(body.names, request.user);
        if (data) {
            res.data = data;
            res.status = true;
            res.code = 200;
        }
        return response.status(res.code).send(res);
    }
};
tslib_1.__decorate([
    (0, common_1.Post)('/set-parameter'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ConfigController.prototype, "setParameter", null);
tslib_1.__decorate([
    (0, common_1.Post)('/get-parameter'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Request)()),
    tslib_1.__param(2, (0, common_1.Res)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ConfigController.prototype, "getParameter", null);
ConfigController = tslib_1.__decorate([
    (0, common_1.Controller)('config'),
    tslib_1.__metadata("design:paramtypes", [config_service_1.ConfigParametersService])
], ConfigController);
exports.ConfigController = ConfigController;
//# sourceMappingURL=config.controller.js.map