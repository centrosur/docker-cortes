"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    portBackend: +process.env.PORT_BACKEND,
    database: {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        esquema: process.env.DATABASE_ESQUEMA,
        databaseType: process.env.DATABASE_TYPE
    },
    codigoSociedad: '1023',
    jwtSecret: 'RDEtQ09UMUMtYzNudHIwc3Vy',
    securityKey: 'Q2VudHJvIFN1ciAtIFBPUlRBTCBDSVVEQURBTk8gLSAyMDIz',
    host_backend: process.env.HOST_BACKEND,
    proxy_database: {
        host: process.env.HOST_DATABASE,
        token: process.env.TOKEN_DATABASE,
        enable: false
    },
    admin: {
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
    }
});
//# sourceMappingURL=configuration.js.map