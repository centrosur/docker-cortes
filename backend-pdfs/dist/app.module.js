"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_module_1 = require("./config/config.module");
const config_1 = require("@nestjs/config");
const configuration_1 = require("./config/configuration");
const database_module_1 = require("./database/database.module");
const auth_module_1 = require("./auth/auth.module");
const portal_module_1 = require("./portal/portal.module");
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `.env`,
                load: [configuration_1.default],
                isGlobal: true
            }),
            config_module_1.ConfigParametersModule,
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            portal_module_1.PortalModule
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map