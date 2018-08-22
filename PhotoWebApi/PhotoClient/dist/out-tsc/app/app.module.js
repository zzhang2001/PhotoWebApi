"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var user_service_1 = require("./user.service");
var photo_service_1 = require("./photo.service");
var app_component_1 = require("./app.component");
var menubar_component_1 = require("./menubar/menubar.component");
var app_routing_module_1 = require("./app-routing.module");
var photos_component_1 = require("./photos/photos.component");
var register_component_1 = require("./register/register.component");
var login_component_1 = require("./login/login.component");
var details_component_1 = require("./details/details.component");
var addphoto_component_1 = require("./addphoto/addphoto.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                menubar_component_1.MenubarComponent,
                photos_component_1.PhotosComponent,
                register_component_1.RegisterComponent,
                login_component_1.LoginComponent,
                details_component_1.DetailsComponent,
                addphoto_component_1.AddphotoComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpClientModule,
                forms_1.ReactiveFormsModule,
                app_routing_module_1.AppRoutingModule
            ],
            providers: [
                user_service_1.UserService,
                photo_service_1.PhotoService
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map