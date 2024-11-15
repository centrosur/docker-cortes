"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const morgan = require("morgan");
const express_1 = require("express");
async function bootstrap() {
    const port = parseInt(process.env.PORT_BACKEND);
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(morgan('dev'));
    app.setGlobalPrefix('api/v2');
    app.use('/api/v2/config/set-parameter', (0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.json)({ limit: '100kb' }));
    app.enableCors({
        origin: true,
        credentials: false
    });
    await app.listen(port);
    console.log('running portal backend in port -> ', port);
}
bootstrap();
//# sourceMappingURL=main.js.map