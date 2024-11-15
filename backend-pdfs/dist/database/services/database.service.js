"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const database_connection_1 = require("./database.connection");
const moment = require("moment");
const axios = require('axios');
let DatabaseService = class DatabaseService {
    constructor(databaseConnectionService, configService) {
        this.databaseConnectionService = databaseConnectionService;
        this.configService = configService;
        this.withProxy = false;
        this.pool = this.databaseConnectionService.getConnection();
        this.codigoSociedad = +configService.get('codigoSociedad', { infer: true });
        console.log('Proxy DB2 -> ', this.withProxy);
        setTimeout(() => {
        }, 3000);
    }
    findOneById(library, table, id) {
        return new Promise(async (resolve) => {
            let response = { ok: false };
            try {
                if (this.withProxy) {
                    const request = { library, table, id };
                    response = await this.sendRequestProxyDatabase('findOneById', request);
                    resolve(response);
                    return;
                }
                else {
                    let queryId = id;
                    if (typeof id === 'string') {
                        queryId = `'${id}'`;
                    }
                    const query = `
                        SELECT * FROM ${library}.${table} WHERE id=${queryId}
                    `;
                    const results = await this.pool.query(query);
                    response.ok = true;
                    response.data = this.setDataLowerCase(results[0]);
                    resolve(response);
                    return;
                }
            }
            catch (error) {
                console.log('error -> ', error);
                response.error = error;
                resolve(response);
                return;
            }
        });
    }
    findOne(library, table, conditions) {
        return new Promise(async (resolve, reject) => {
            let response = { ok: false };
            try {
                const result = await this.find(library, table, conditions);
                if (result.ok && result.data.length) {
                    response.data = this.setDataLowerCase(result.data[0]);
                    response.ok = true;
                }
                else {
                    if (result.ok) {
                        response.ok = true;
                        response.data = null;
                    }
                }
                resolve(response);
                return;
            }
            catch (error) {
                response.error = error;
                console.log('error');
                resolve(response);
                return;
            }
        });
    }
    createOne(library, table, data, metadata = true) {
        return new Promise(async (resolve) => {
            let response = { ok: false };
            try {
                if (metadata) {
                    const now = moment(new Date());
                    data['created'] = now.format('YYYY-MM-DD HH:mm:ss.000000');
                    data['updated'] = now.format('YYYY-MM-DD HH:mm:ss.000000');
                    data['sociedad'] = this.codigoSociedad;
                }
                if (this.withProxy) {
                    const request = { library, table, data };
                    response = await this.sendRequestProxyDatabase('createOne', request);
                    resolve(response);
                    return;
                }
                else {
                    const columns = this.getFields(data);
                    let COLUMNS = '';
                    let VALUES = '';
                    columns.forEach((column, index) => {
                        if (index != (columns.length - 1)) {
                            COLUMNS = COLUMNS + column.label + ', ';
                            VALUES = VALUES + column.value + ', ';
                        }
                        else {
                            COLUMNS = COLUMNS + column.label;
                            VALUES = VALUES + column.value;
                        }
                    });
                    const query = ` INSERT INTO ${library}.${table} (${COLUMNS}) VALUES(${VALUES}) `;
                    let results;
                    results = await this.pool.query(query);
                    response.ok = true;
                    response.data = results;
                    resolve(response);
                    return;
                }
            }
            catch (error) {
                console.log('error createOne');
                console.log('error createOne -> ', error);
                response.error = error;
                resolve(response);
                return;
            }
        });
    }
    deleteOne(library, table, id) {
        return new Promise(async (resolve) => {
            let response = { ok: false };
            try {
                if (this.withProxy) {
                    const request = { library, table, id };
                    response = await this.sendRequestProxyDatabase('deleteOne', request);
                    resolve(response);
                    return;
                }
                else {
                    let queryId = id;
                    if (typeof id === 'string') {
                        queryId = `'${id}'`;
                    }
                    const query = ` DELETE FROM ${library}.${table} WHERE ID = ${queryId}`;
                    let rowsDeleted = 0;
                    rowsDeleted = await this.pool.insertAndGetId(query);
                    response.ok = true;
                    response.data = rowsDeleted;
                    console.log('response deleted ->  ', response);
                    resolve(response);
                    return;
                }
            }
            catch (error) {
                console.log('error -> ', error);
                response.error = error;
                resolve(response);
                return;
            }
        });
    }
    updateOne(library, table, id, data, backend = true) {
        return new Promise(async (resolve, reject) => {
            let response = { ok: false };
            try {
                if (!backend) {
                    const now = moment(new Date());
                    data['updated'] = now.format('YYYY-MM-DD HH:mm:ss.000000');
                }
                const columns = this.getFields(data);
                let UPDATE = '';
                columns.forEach((column, index) => {
                    if (index != (columns.length - 1)) {
                        UPDATE = UPDATE + column.label + '=' + column.value + ', ';
                    }
                    else {
                        UPDATE = UPDATE + column.label + '=' + column.value;
                    }
                });
                let queryId = id;
                if (typeof id === 'string') {
                    queryId = `'${id}'`;
                }
                const query = `
                    UPDATE ${library}.${table} SET ${UPDATE}
                    WHERE ID = ${queryId}
                `;
                let results;
                results = await this.pool.query(query);
                response.ok = true;
                response.data = results;
                resolve(response);
                return;
            }
            catch (error) {
                console.log('error -> ', error);
                response.error = error;
                resolve(response);
                return;
            }
        });
    }
    find(library, table, conditions, orderFieldName = null, ORDER = 'asc', LIMIT = null, STARTAT = null) {
        return new Promise(async (resolve, reject) => {
            let response = { ok: false };
            try {
                let CONDITION = '';
                conditions.forEach((condition, indexC) => {
                    CONDITION = CONDITION + '(';
                    const columns = this.getFields(condition);
                    columns.forEach((column, index) => {
                        const query = this.separateConditionOfValue(column.value);
                        if (index != (columns.length - 1)) {
                            CONDITION = CONDITION + column.label + query.conditional + query.value + ' AND ';
                        }
                        else {
                            CONDITION = CONDITION + column.label + query.conditional + query.value + ')';
                            ;
                        }
                    });
                    if (indexC != (conditions.length - 1)) {
                        CONDITION = CONDITION + ' OR ';
                    }
                });
                let query = `
                    SELECT * FROM ${library}.${table} WHERE ${CONDITION}
                `;
                if (orderFieldName && ORDER) {
                    query = query + ` ORDER BY ${orderFieldName} ${ORDER}`;
                }
                if (LIMIT != null && STARTAT != null) {
                    query = query + ` LIMIT ${STARTAT} , ${LIMIT}`;
                }
                else if (LIMIT != null) {
                    query = query + ` LIMIT ${LIMIT} `;
                }
                let results = await this.pool.query(query);
                results = results.rows;
                response.data = [];
                results.forEach((result) => {
                    const value = this.setDataLowerCase(result);
                    response.data.push(value);
                });
                response.ok = true;
                resolve(response);
                return;
            }
            catch (error) {
                response.error = error;
                console.log('error find 1 -> ', table, conditions, error);
                resolve(response);
                return;
            }
        });
    }
    sqlQuery(sentencia, values = []) {
        return new Promise(async (resolve, reject) => {
            let response = { ok: false };
            try {
                let query = sentencia;
                console.log('sqlQuery sentencia -> ', sentencia, values);
                let results;
                if (values.length) {
                    results = await this.pool.query(query, values);
                }
                else {
                    results = await this.pool.query(query);
                }
                response.data = [];
                if (!values.length) {
                    results.forEach((result) => {
                        const value = this.setDataLowerCase(result);
                        response.data.push(value);
                    });
                }
                response.ok = true;
                resolve(response);
                return;
            }
            catch (error) {
                response.error = error;
                console.log('error sqlQuery -> ', error);
                resolve(response);
                return;
            }
        });
    }
    getFields(element) {
        let columns = [];
        for (const key in element) {
            if (Object.prototype.hasOwnProperty.call(element, key)) {
                let value;
                if (typeof element[key] === 'string') {
                    value = `'${element[key]}'`;
                }
                else {
                    value = element[key];
                }
                let column = { label: key, value };
                columns.push(column);
            }
        }
        return columns;
    }
    separateConditionOfValue(value) {
        let separate = { conditional: '=', value };
        if (typeof value === 'string') {
            let existConditional = false;
            conditionals.every(conditional => {
                if (value.search(conditional) == 0) {
                    separate.conditional = conditional;
                    existConditional = true;
                    return false;
                }
                return true;
            });
            if (existConditional) {
                console.log('existConditional');
                value = value.split(separate.conditional + ' ')[1];
                value = value.substring(0, (value.length - 1));
                separate.value = (+value) ? +value : value;
            }
        }
        return separate;
    }
    setDataLowerCase(data) {
        const value = {};
        for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
                const element = data[key];
                if (!isNaN(+element)) {
                    if (element) {
                        if (element.length == ((+element) + '').length) {
                            if (key.toLocaleLowerCase() != 'phone') {
                                value[key.toLocaleLowerCase()] = +element;
                                continue;
                            }
                        }
                    }
                }
                value[key.toLocaleLowerCase()] = element;
            }
        }
        return value;
    }
    async sendRequestProxyDatabase(path, request) {
        const proxyDB2credentials = this.configService.get('proxy_database', { infer: true });
        const url = proxyDB2credentials.host;
        const auth = "Bearer " + proxyDB2credentials.token;
        process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
        const result = await axios.post(url + '/' + path, request, { headers: {
                'Content-Type': 'application/json',
                "Authorization": `${auth}`
            }
        });
        return result.data;
    }
};
DatabaseService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [database_connection_1.DatabaseConnectionService,
        config_1.ConfigService])
], DatabaseService);
exports.DatabaseService = DatabaseService;
const conditionals = ['=', '>', '<', '>=', '<=', '!='];
//# sourceMappingURL=database.service.js.map