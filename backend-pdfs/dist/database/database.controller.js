"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseController = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const database_guards_1 = require("./services/database.guards");
const database_service_1 = require("./services/database.service");
let DatabaseController = class DatabaseController {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    findOneById(request) {
        return this.databaseService.findOneById(request.library, request.table, request.id);
    }
    findOne(request) {
        return this.databaseService.findOne(request.library, request.table, request.conditions);
    }
    find(request) {
        const requestValidated = {
            library: request.library,
            table: request.table,
            conditions: request.conditions,
            orderFieldName: request.orderFieldName ? request.orderFieldName : null,
            order: request.order ? request.order : 'desc',
            limit: request.limit ? request.limit : null,
            start_at: request.start_at ? request.start_at : null
        };
        return this.databaseService.find(requestValidated.library, requestValidated.table, requestValidated.conditions, requestValidated.orderFieldName, requestValidated.order, requestValidated.limit, requestValidated.start_at);
    }
    createOne(request) {
        return this.databaseService.createOne(request.library, request.table, request.data);
    }
    updateOne(request) {
        return this.databaseService.updateOne(request.library, request.table, request.id, request.data, false);
    }
    deleteOne(request) {
        return this.databaseService.deleteOne(request.library, request.table, request.id);
    }
};
tslib_1.__decorate([
    (0, common_1.Post)('/findOneById'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DatabaseController.prototype, "findOneById", null);
tslib_1.__decorate([
    (0, common_1.Post)('/findOne'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DatabaseController.prototype, "findOne", null);
tslib_1.__decorate([
    (0, common_1.Post)('/find'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DatabaseController.prototype, "find", null);
tslib_1.__decorate([
    (0, common_1.Post)('/createOne'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DatabaseController.prototype, "createOne", null);
tslib_1.__decorate([
    (0, common_1.Post)('/updateOne'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DatabaseController.prototype, "updateOne", null);
tslib_1.__decorate([
    (0, common_1.Post)('/deleteOne'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], DatabaseController.prototype, "deleteOne", null);
DatabaseController = tslib_1.__decorate([
    (0, common_1.UseGuards)(database_guards_1.DatabaseGuard),
    (0, common_1.Controller)('database'),
    tslib_1.__metadata("design:paramtypes", [database_service_1.DatabaseService])
], DatabaseController);
exports.DatabaseController = DatabaseController;
//# sourceMappingURL=database.controller.js.map