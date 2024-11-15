"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigParametersModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_service_1 = require("./config.service");
const config_controller_1 = require("./config.controller");
const database_module_1 = require("../database/database.module");
let ConfigParametersModule = class ConfigParametersModule {
};
ConfigParametersModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule
        ],
        providers: [config_service_1.ConfigParametersService],
        controllers: [config_controller_1.ConfigController],
        exports: [
            config_service_1.ConfigParametersService
        ]
    })
], ConfigParametersModule);
exports.ConfigParametersModule = ConfigParametersModule;
//# sourceMappingURL=config.module.js.map