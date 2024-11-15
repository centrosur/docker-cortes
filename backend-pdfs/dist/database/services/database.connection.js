"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConnectionService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
let DatabaseConnectionService = class DatabaseConnectionService {
    constructor(configService) {
        this.configService = configService;
        this.credentials = this.configService.get('database', { infer: true });
        this.database = this.credentials.esquema;
        this.configPostgress(this.credentials);
    }
    configPostgress(credentials) {
        this.pool = new pg_1.Pool({
            host: credentials.host,
            user: credentials.username,
            password: credentials.password,
            database: credentials.database,
            port: credentials.port
        });
        this.pool.connect((err, connection) => {
            if (err) {
                console.log('error conection change -> ', err);
                return;
            }
            console.log('Database is connected successfully !');
            connection.release();
        });
    }
    getConnection() {
        return this.pool;
    }
};
DatabaseConnectionService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [config_1.ConfigService])
], DatabaseConnectionService);
exports.DatabaseConnectionService = DatabaseConnectionService;
//# sourceMappingURL=database.connection.js.map