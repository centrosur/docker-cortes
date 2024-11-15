"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./auth-strategies/jwt.strategy");
const passport_1 = require("@nestjs/passport");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const database_module_1 = require("../database/database.module");
const config_1 = require("@nestjs/config");
const config_module_1 = require("../config/config.module");
let AuthModule = class AuthModule {
};
AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                useFactory: (config) => {
                    return {
                        secret: config.get('jwtSecret'),
                        signOptions: {
                            expiresIn: '7300 days',
                        },
                    };
                },
                inject: [config_1.ConfigService],
            }),
            passport_1.PassportModule.register({
                defaultStrategy: 'jwt'
            }),
            (0, common_1.forwardRef)(() => database_module_1.DatabaseModule),
            (0, common_1.forwardRef)(() => config_module_1.ConfigParametersModule)
        ],
        providers: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy
        ],
        controllers: [auth_controller_1.AuthController],
        exports: [
            passport_1.PassportModule,
            jwt_strategy_1.JwtStrategy,
            auth_service_1.AuthService
        ],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map