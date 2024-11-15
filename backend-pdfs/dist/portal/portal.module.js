"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortalModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const portal_controller_1 = require("./portal.controller");
const auth_portal_service_1 = require("./services/auth.portal.service");
const database_module_1 = require("../database/database.module");
const config_module_1 = require("../config/config.module");
const axios_1 = require("@nestjs/axios");
const auth_module_1 = require("../auth/auth.module");
let PortalModule = class PortalModule {
};
PortalModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            (0, common_1.forwardRef)(() => database_module_1.DatabaseModule),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
            (0, common_1.forwardRef)(() => config_module_1.ConfigParametersModule),
            axios_1.HttpModule,
        ],
        controllers: [portal_controller_1.PortalController],
        providers: [
            auth_portal_service_1.AuthPortalService,
        ],
        exports: []
    })
], PortalModule);
exports.PortalModule = PortalModule;
//# sourceMappingURL=portal.module.js.map