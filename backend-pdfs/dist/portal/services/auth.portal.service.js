"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthPortalService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/services/database.service");
const config_1 = require("@nestjs/config");
const moment = require("moment");
const auth_service_1 = require("../../auth/auth.service");
const bcryptjs_1 = require("bcryptjs");
let AuthPortalService = class AuthPortalService {
    constructor(databaseService, authService, configService) {
        this.databaseService = databaseService;
        this.authService = authService;
        this.configService = configService;
        const credentials = this.configService.get('database', { infer: true });
        this.library = credentials.esquema;
        this.codigoSociedad = +configService.get('codigoSociedad', { infer: true });
    }
    async registerUser(request, sendEmail = true, timeExpiredToken = 5) {
        const response = { ok: false };
        console.log('registerUser -> ', request.username);
        try {
            let newUser;
            if (!newUser) {
                console.log('NO es cliente, proceder al registro como invitado');
                const invitado = {
                    library: this.library,
                    username: request.username,
                    password: request.password,
                    metaData: {
                        name: request.metadatos.name,
                        email: request.metadatos.email,
                        phone: request.metadatos.phone,
                        docid: request.username,
                        rol: 'invitado'
                    }
                };
                newUser = invitado;
            }
            const responseAuth = await this.authService.register(newUser, sendEmail, timeExpiredToken);
            const user = {
                name: newUser.metaData.name,
                email: newUser.metaData.email,
                phone: newUser.metaData.phone,
                docid: newUser.metaData.docid,
                rol: newUser.metaData.rol
            };
            if (responseAuth.ok) {
                response.ok = true;
                response.datos = responseAuth.datos;
            }
            else {
                response.message = responseAuth.error;
            }
            return response;
        }
        catch (error) {
            console.log('consultar SAP ERROR -> ', error);
            response.error = error;
            response.message = `
                <p class="normal">Servicio <strong>no disponible</strong>, por favor inténtelo más tarde.</p>
            `;
            return response;
        }
    }
    async getAccount(value) {
        const condition = {};
        condition['username'] = value;
        const responseDB = await this.databaseService.findOne(this.library, 'accounts', [condition]);
        if (responseDB.ok && responseDB.data) {
            return responseDB.data;
        }
        return null;
    }
    async refreshToken(request) {
        const response = { ok: false };
        try {
            const exists = await this.databaseService.findOne(request.library, 'accounts', [{ username: request.username, sociedad: this.codigoSociedad }]);
            if (exists.ok) {
                const account = exists.data;
                let user;
                if (account) {
                    const passwordOk = await (0, bcryptjs_1.compare)(request.password, account.password);
                    if (passwordOk) {
                        const find = await this.databaseService.findOne(request.library, 'users', [{ user_id: account.id }]);
                        if (find.ok && find.data) {
                            user = find.data;
                            const token = this.authService.getToken(user);
                            const now = moment(new Date());
                            account.login_on = now.format('YYYY-MM-DD HH:mm:ss.000000');
                            this.databaseService.updateOne(request.library, 'accounts', account.id, { login_on: account.login_on });
                            response.ok = true;
                            response.datos = user;
                            response.token = token;
                        }
                    }
                }
            }
            return response;
        }
        catch (error) {
            console.log('refreshToken error -> ', error);
            response.error = error;
            return response;
        }
    }
    getTypeDoc(value) {
        if (value.length == 10) {
            return 'CEDULA';
        }
        if (value.length == 13) {
            return 'RUC';
        }
        return 'PASAPORTE';
    }
    getEmailAnonimizado(value) {
        const host = value.split('@')[1];
        let email = value.substring(0, 5) + 'xxxxx' + host;
        return email;
    }
    getTextAceptacionPermisos() {
        return `
             <p class="normal text-center mb-0">
                Al crear su cuenta otorga su consentimiento para el uso y tratamiento de sus datos personales, 
                mismos que serán utilizados exclusivamente para la gestión de sus requerimientos y consultas en general. 
                Conozca más aquí: 
             </p>     
            <div class="text-center">
                <a class="normal text-center mb-0" target="blank" href="https://www.centrosur.gob.ec/autorizacion-de-uso-de-datos-personales"> 
                        Autorización de uso y tratamiento de datos personales 
                </a>
            </div>   
        `;
    }
};
AuthPortalService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [database_service_1.DatabaseService,
        auth_service_1.AuthService,
        config_1.ConfigService])
], AuthPortalService);
exports.AuthPortalService = AuthPortalService;
//# sourceMappingURL=auth.portal.service.js.map