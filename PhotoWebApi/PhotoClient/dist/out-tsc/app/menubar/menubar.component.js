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
var user_service_1 = require("../user.service");
var MenubarComponent = /** @class */ (function () {
    function MenubarComponent(userService) {
        this.userService = userService;
    }
    MenubarComponent.prototype.ngOnInit = function () {
        if (this.userService.sessStorage == null) {
            this.userService.sessStorage = window.sessionStorage;
        }
        this.userService.SetUserFromToken();
    };
    MenubarComponent.prototype.Logout = function () {
        this.userService.Logout();
    };
    MenubarComponent = __decorate([
        core_1.Component({
            selector: 'app-menubar',
            templateUrl: './menubar.component.html',
            styleUrls: ['./menubar.component.css']
        }),
        __metadata("design:paramtypes", [user_service_1.UserService])
    ], MenubarComponent);
    return MenubarComponent;
}());
exports.MenubarComponent = MenubarComponent;
//# sourceMappingURL=menubar.component.js.map