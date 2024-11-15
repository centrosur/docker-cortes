"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const bcryptjs_1 = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const moment = require("moment");
const database_service_1 = require("../database/services/database.service");
const config_1 = require("@nestjs/config");
const auth_models_1 = require("./models/auth.models");
const config_service_1 = require("../config/config.service");
const handlebars = require('handlebars');
let AuthService = class AuthService {
    constructor(jwtService, databaseService, configService, configParametersService) {
        this.jwtService = jwtService;
        this.databaseService = databaseService;
        this.configParametersService = configParametersService;
        this.codigoSociedad = +configService.get('codigoSociedad', { infer: true });
        const admin = configService.get('admin', { infer: true });
        setTimeout(() => {
            this.register({
                library: 'public',
                username: admin.email,
                password: admin.password,
                metaData: {
                    name: admin.name,
                    email: admin.email,
                    phone: '0999999999',
                    docid: '0999999999',
                    rol: 'admin'
                }
            });
        }, 2000);
    }
    async register(request, sendEmail = true, timeExpiredToken = 5) {
        const response = { ok: false };
        try {
            const exists = await this.databaseService.findOne(request.library, 'accounts', [{ username: request.username, sociedad: this.codigoSociedad }]);
            let uid;
            if (exists.ok && exists.data) {
                const account = exists.data;
                uid = account.id;
                if (account.enable) {
                    response.error = 'Usuario ya existe';
                    throw new common_1.BadRequestException({ error: 'Usuario ya existe' });
                }
                else {
                    await this.databaseService.deleteOne(request.library, 'accounts', account.id);
                    const find = await this.databaseService.findOne(request.library, 'users', [{ user_id: account.id }]);
                    if (find.ok && find.data) {
                        await this.databaseService.deleteOne(request.library, 'users', find.data.id);
                    }
                }
            }
            const account = uid ? new auth_models_1.Account(request, uid) : new auth_models_1.Account(request);
            await account.hashPasword();
            account.setTokenToValidEmailOrPhone(timeExpiredToken);
            console.log('account -> ', account);
            const saveAccount = await this.databaseService.createOne(request.library, 'accounts', account);
            if (saveAccount.ok) {
                const metaData = request.metaData;
                metaData.user_id = account.id;
                console.log('user to create -> ', metaData);
                const saveUser = await this.databaseService.createOne(request.library, 'users', metaData);
                if (saveUser.ok) {
                    response.ok = true;
                    response.datos = metaData;
                    return response;
                }
            }
            return response;
        }
        catch (error) {
            response.error = error;
            return response;
        }
    }
    async login(request) {
        const response = { ok: false };
        try {
            const exists = await this.databaseService.findOne(request.library, 'accounts', [{ username: request.username, sociedad: this.codigoSociedad }]);
            if (exists.ok) {
                const account = exists.data;
                if (!account) {
                    response.error = 'Username o contraseña inválida';
                    response.message = 'Usuario o contraseña inválida';
                    response.status = 400;
                    return response;
                }
                const passwordOk = await (0, bcryptjs_1.compare)(request.password, account.password);
                if (!passwordOk) {
                    response.error = 'Username o contraseña inválida';
                    response.message = 'Usuario o contraseña inválida';
                    response.status = 400;
                    return response;
                }
                const find = await this.databaseService.findOne(request.library, 'users', [{ user_id: account.id }]);
                if (find.ok) {
                    const user = find.data;
                    const token = this.getToken(user);
                    const now = moment(new Date());
                    account.login_on = now.format('YYYY-MM-DD HH:mm:ss.000000');
                    this.databaseService.updateOne(request.library, 'accounts', account.id, { login_on: account.login_on });
                    response.ok = true;
                    response.datos = user;
                    response.token = token;
                }
            }
            console.log('login response change -> ', response);
            return response;
        }
        catch (error) {
            response.error = error;
            return response;
        }
    }
    async desactivarCuenta(data, user_id) {
        let response = { ok: false };
        const exists = await this.databaseService.findOneById(data.library, 'accounts', user_id);
        if (exists.ok && exists.data) {
            const account = exists.data;
            account.enable = 0;
            await this.databaseService.updateOne(data.library, 'accounts', account.id, { enable: account.enable });
            response.ok = true;
        }
        return response;
    }
    getToken(metadata) {
        const payloadToken = JSON.parse(JSON.stringify(metadata));
        delete payloadToken.password;
        return this.jwtService.sign(payloadToken);
    }
    decodeToken(token) {
        return this.jwtService.decode(token);
    }
    getEmailAnonimizado(value) {
        const host = value.split('@')[1];
        let email = value.substring(0, 5) + 'xxxxx' + host;
        return email;
    }
};
AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [jwt_1.JwtService,
        database_service_1.DatabaseService,
        config_1.ConfigService,
        config_service_1.ConfigParametersService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map