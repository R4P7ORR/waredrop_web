"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = exports.AuthPayloadDto = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
class AuthPayloadDto {
}
exports.AuthPayloadDto = AuthPayloadDto;
let AuthService = class AuthService {
    constructor(jwtService, usersService) {
        this.jwtService = jwtService;
        this.usersService = usersService;
    }
    async validateUser(input) {
        const user = await this.usersService.findUser(input.email);
        if (user && await bcrypt.compare(input.password, user.user_password)) {
            const payload = {
                sub: {
                    id: user.user_id
                },
                email: user.user_email
            };
            return {
                accessToken: this.jwtService.sign(payload)
            };
        }
        else {
            throw new common_1.NotFoundException;
        }
    }
    async register(newUser) {
        const user = await this.usersService.findUser(newUser.email);
        if (user) {
            return { errorMessage: 'User already exist' };
        }
        else {
            const result = await this.usersService.createUser(newUser);
            return result;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        users_service_1.UsersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map