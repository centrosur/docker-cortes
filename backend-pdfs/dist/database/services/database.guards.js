"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseGuard = void 0;
const tslib_1 = require("tslib");
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let DatabaseGuard = class DatabaseGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor() {
        super();
        this.secure = false;
        this.rules = [];
        this.typeActions = [
            { path: 'find', action: 'read' },
            { path: 'findOneById', action: 'read' },
            { path: 'findOne', action: 'read' },
            { path: 'createOne', action: 'write' },
            { path: 'deleteOne', action: 'delete' },
            { path: 'updateOne', action: 'update' },
        ];
        this.initRules();
    }
    canActivate(context) {
        this.request = context.switchToHttp().getRequest();
        try {
            this.token = this.request?.headers?.authorization?.split(' ')[1];
        }
        catch (error) { }
        return super.canActivate(context);
    }
    async handleRequest(err, user, info) {
        const request = this.request;
        const data = request.body.data ? request.body.data : null;
        const action = request.url.replace('/api/v2/database/', '');
        console.log('handleRequest databse guards -> ', action);
        const typeAction = this.typeActions.find(type => { return type.path == action; });
        const rule = this.rules.find(rule => { return rule.table == request.body.table; });
        if (this.token) {
            const isAdmin = false;
            if (isAdmin) {
                console.log('isAdmin -> ', isAdmin);
                return true;
            }
        }
        if (rule) {
            if (typeAction) {
                const result = await rule.rules[typeAction.action](request.body, user, data);
                console.log('result guard -> ', result);
                if (result)
                    return true;
                else
                    throw new common_1.UnauthorizedException({ message: 'Acceso denegado.' });
            }
        }
        if (!this.secure)
            return true;
        else
            throw new common_1.UnauthorizedException({ message: 'Acceso denegado.' });
    }
    initRules() {
        this.rules = [
            {
                table: 'parame',
                rules: {
                    read: async (request, user, data) => {
                        return true;
                    },
                    write: async (request, user, data) => {
                        return false;
                    },
                    update: async (request, user, data) => {
                        return false;
                    },
                    delete: async (request, user, data) => {
                        return false;
                    }
                }
            }
        ];
    }
};
DatabaseGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], DatabaseGuard);
exports.DatabaseGuard = DatabaseGuard;
//# sourceMappingURL=database.guards.js.map