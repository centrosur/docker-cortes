"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const database_connection_1 = require("./services/database.connection");
const database_service_1 = require("./services/database.service");
const database_controller_1 = require("./database.controller");
const jwt_1 = require("@nestjs/jwt");
const database_guards_1 = require("./services/database.guards");
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule,
        ],
        providers: [
            database_service_1.DatabaseService,
            database_connection_1.DatabaseConnectionService,
            database_guards_1.DatabaseGuard
        ],
        controllers: [database_controller_1.DatabaseController],
        exports: [
            database_service_1.DatabaseService
        ]
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map