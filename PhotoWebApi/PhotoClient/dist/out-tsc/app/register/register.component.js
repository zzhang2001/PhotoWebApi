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
var forms_1 = require("@angular/forms");
var viewmodels_1 = require("../viewmodels");
var user_service_1 = require("../user.service");
var router_1 = require("@angular/router");
// Custom validator function. Two passwords must match.
var PasswordMatchValidator = function (control) {
    var password = control.get('password');
    var confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ?
        null : { 'passwordsNotMatch': true };
};
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(router, userService) {
        this.router = router;
        this.userService = userService;
        this.registerViewModel = new viewmodels_1.RegisterViewModel();
        this.loading = false;
        this.emailPattern = /^[\w\.-]+@([\w-]+\.)+[\w-]{2,4}$/;
        this.registerForm = new forms_1.FormGroup({
            email: new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.pattern(this.emailPattern)]),
            password: new forms_1.FormControl('', forms_1.Validators.required),
            confirmPassword: new forms_1.FormControl('', forms_1.Validators.required)
        }, PasswordMatchValidator);
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(RegisterComponent.prototype, "email", {
        get: function () { return this.registerForm.get('email'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "password", {
        get: function () { return this.registerForm.get('password'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RegisterComponent.prototype, "confirmPassword", {
        get: function () { return this.registerForm.get('confirmPassword'); },
        enumerable: true,
        configurable: true
    });
    RegisterComponent.prototype.Register = function () {
        var _this = this;
        this.loading = true;
        this.registerViewModel = this.registerForm.value;
        this.userService.Register(this.registerViewModel).subscribe(function (result) {
            _this.token = result;
            _this.loading = false;
            _this.userService.saveToken(_this.token);
            _this.userService.SetUserFromToken();
            _this.router.navigate(['/home']);
        }, function (err) {
            // Provide description error message based on http response status code.
            if (err.status == 400) {
                _this.errMsg = err.error;
            }
            else {
                _this.errMsg = err.message;
            }
            _this.loading = false;
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            selector: 'app-register',
            templateUrl: './register.component.html',
            styleUrls: ['./register.component.css']
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, user_service_1.UserService])
    ], RegisterComponent);
    return RegisterComponent;
    var _a;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map