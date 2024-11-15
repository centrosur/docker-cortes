"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigParametersService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const database_service_1 = require("../database/services/database.service");
const moment = require("moment");
let ConfigParametersService = class ConfigParametersService {
    constructor(databaseService, configService) {
        this.databaseService = databaseService;
        this.configService = configService;
        this.crypto = require("crypto");
        this.algorithm = "aes-256-cbc";
        this.initVector = Buffer.from([55, 81, 79, 50, 77, 12, 24, 38, 90, 23, 91, 23, 49, 21, 50, 46]);
        const credentials = this.configService.get('database', { infer: true });
        this.library = credentials.esquema;
        this.securityKey = this.configService.get('securityKey', { infer: true });
        this.securityKey = this.crypto.createHash('sha256').update(String(this.securityKey)).digest('base64').substr(0, 32);
        this.codigoSociedad = +configService.get('codigoSociedad', { infer: true });
    }
    async setParameter(request) {
        const response = { ok: false };
        try {
            const result = await this.databaseService.findOne(this.library, 'parame', [{ name: request.name, sociedad: this.codigoSociedad }]);
            console.log('setParameter  -> ', result.data);
            if (result.ok && result.data) {
                if (result.data.cifrado) {
                    const cipher = this.crypto.createCipheriv(this.algorithm, this.securityKey, this.initVector);
                    let encryptedData = cipher.update(request.value, "utf-8", "hex");
                    encryptedData += cipher.final("hex");
                    request.value = encryptedData;
                }
                const updateData = { value: request.value + '' };
                console.log('this.library -> ', this.library);
                const now = moment(new Date());
                updateData['updated'] = now.format('YYYY-MM-DD HH:mm:ss.000000');
                const update = await this.databaseService.sqlQuery(`UPDATE PUBLIC.PARAME SET value = $1, updated = $2 WHERE ID = ${result.data.id}`, [updateData.value, updateData.updated]);
                if (update.ok && update.data) {
                    response.ok = true;
                }
                else {
                    response.error = update.error;
                }
            }
            else {
                console.log('crear nuevo parametro');
                const parametro = {
                    name: request.name,
                    value: request.value + '',
                    descrip: request.description,
                    cifrado: request.cifrado
                };
                if (request.cifrado) {
                    const cipher = this.crypto.createCipheriv(this.algorithm, this.securityKey, this.initVector);
                    let encryptedData = cipher.update(request.value, "utf-8", "hex");
                    encryptedData += cipher.final("hex");
                    parametro.value = encryptedData;
                }
                const now = moment(new Date());
                parametro['created'] = now.format('YYYY-MM-DD HH:mm:ss.000000');
                parametro['updated'] = now.format('YYYY-MM-DD HH:mm:ss.000000');
                const save = await this.databaseService.sqlQuery('INSERT INTO PUBLIC.PARAME (value, sociedad, name, descrip, cifrado, created, updated) VALUES($1, $2, $3, $4, $5, $6, $7)', [parametro.value, this.codigoSociedad, parametro.name, parametro.descrip, parametro.cifrado, parametro.created, parametro.updated]);
                if (save.ok) {
                    response.ok = true;
                }
                else {
                    response.error = save.error;
                }
            }
            console.log('response  -> ', response);
            return response;
        }
        catch (error) {
            console.log('error ', error);
            response.error = error;
            return response;
        }
    }
    async getParameters(names) {
        let response = {};
        let cont = 0;
        try {
            let busquedas = [];
            names.forEach(name => {
                const busqueda = { name, sociedad: this.codigoSociedad };
                busquedas.push(busqueda);
            });
            const result = await this.databaseService.find(this.library, 'parame', busquedas);
            if (result.ok && result.data) {
                result.data.forEach((parametro) => {
                    const value = this.getValueOfParameter(parametro);
                    response[parametro.name] = value;
                    cont++;
                });
            }
            if (cont == names.length) {
                return response;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.log(' error get parameters ', error);
            return null;
        }
    }
    async getParametersWithValidation(names, user = null) {
        let response = {};
        let cont = 0;
        try {
            let busquedas = [];
            names.forEach(name => {
                const busqueda = { name, sociedad: this.codigoSociedad };
                busquedas.push(busqueda);
            });
            const result = await this.databaseService.find(this.library, 'parame', busquedas);
            if (result.ok && result.data) {
                result.data.forEach((parametro) => {
                    if (!(+parametro.cifrado) || user?.customClaims?.rol == 'admin') {
                        const value = this.getValueOfParameter(parametro);
                        response[parametro.name] = value;
                    }
                    else {
                        response[parametro.name] = null;
                    }
                    cont++;
                });
            }
            if (cont == names.length) {
                return response;
            }
            else {
                return null;
            }
        }
        catch (error) {
            console.log(' error get parameters ', error);
            return null;
        }
    }
    getVariableEnvironment(name) {
        const value = this.configService.get(name, { infer: true });
        const result = {};
        result[name] = value;
        return result;
    }
    getValueOfParameter(parametro) {
        if (+parametro.cifrado) {
            const decipher = this.crypto.createDecipheriv(this.algorithm, this.securityKey, this.initVector);
            let decryptedData = decipher.update(parametro.value, "hex", "utf-8");
            decryptedData += decipher.final("utf8");
            parametro.value = decryptedData;
        }
        return parametro.value;
    }
};
ConfigParametersService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [database_service_1.DatabaseService,
        config_1.ConfigService])
], ConfigParametersService);
exports.ConfigParametersService = ConfigParametersService;
//# sourceMappingURL=config.service.js.map