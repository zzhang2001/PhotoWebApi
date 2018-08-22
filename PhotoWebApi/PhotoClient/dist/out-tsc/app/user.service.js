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
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.Email = '';
        this.SignedIn = false;
        this.sessStorage = null;
        if (window) {
            this.sessStorage = window.sessionStorage;
        }
    }
    UserService_1 = UserService;
    UserService.prototype.SetRequestOptions = function () {
        this.heads = new http_1.HttpHeaders();
        this.heads = this.heads.set('Content-Type', 'application/json; charset=utf-8');
    };
    // Login user.
    UserService.prototype.Login = function (loginViewModel) {
        this.SetRequestOptions();
        return this.http.post(UserService_1.LOGIN_URL, loginViewModel, { headers: this.heads });
    };
    // Register user.
    UserService.prototype.Register = function (registerViewModel) {
        this.SetRequestOptions();
        return this.http.post(UserService_1.REGISTER_URL, registerViewModel, { headers: this.heads });
    };
    UserService.prototype.Logout = function () {
        this.sessStorage.removeItem(UserService_1.TOKEN_KEY);
        this.SetUserFromToken();
    };
    // Save token to session storage.
    UserService.prototype.saveToken = function (token) {
        this.sessStorage.setItem(UserService_1.TOKEN_KEY, token);
    };
    // Get token from session storage and set Email and SignedIn properties.
    UserService.prototype.SetUserFromToken = function () {
        var jwtToken = this.sessStorage.getItem(UserService_1.TOKEN_KEY);
        if (jwtToken != null) {
            this.Email = JSON.parse(atob(jwtToken.split('.')[1]))['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
            this.SignedIn = true;
        }
        else {
            this.Email = '';
            this.SignedIn = false;
        }
    };
    UserService.TOKEN_KEY = 'JwtToken';
    UserService.LOGIN_URL = 'api/Auth/Login';
    UserService.REGISTER_URL = 'api/Auth/Register';
    UserService = UserService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof http_1.HttpClient !== "undefined" && http_1.HttpClient) === "function" && _a || Object])
    ], UserService);
    return UserService;
    var UserService_1, _a;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map