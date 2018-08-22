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
var user_service_1 = require("./user.service");
var PhotoService = /** @class */ (function () {
    function PhotoService(http, userService) {
        this.http = http;
        this.userService = userService;
    }
    PhotoService_1 = PhotoService;
    PhotoService.prototype.SetRequestOptions = function () {
        this.heads = new http_1.HttpHeaders();
        // An object of HttpHeaders class is immutable. Any of its method returns a new object
        // but does not modify the original object.
        this.heads = this.heads.set('Content-Type', 'application/json; charset=utf-8');
        var token = this.userService.sessStorage.getItem(user_service_1.UserService.TOKEN_KEY);
        if (token !== null) {
            this.heads = this.heads.set('Authorization', 'Bearer ' + token);
        }
    };
    PhotoService.prototype.SetAuthorizationOption = function () {
        this.heads = new http_1.HttpHeaders();
        var token = this.userService.sessStorage.getItem(user_service_1.UserService.TOKEN_KEY);
        if (token !== null) {
            this.heads = this.heads.set('Authorization', 'Bearer ' + token);
        }
    };
    // Get all photos.
    PhotoService.prototype.GetAllPhotos = function () {
        this.SetRequestOptions();
        return this.http.get(PhotoService_1.ALL_PHOTO_URL, { headers: this.heads });
    };
    // Add a photo.
    PhotoService.prototype.AddPhoto = function (body) {
        this.SetAuthorizationOption();
        // Set Content-Type as multipart/form-data does not work. Angular automatically set the right Content-Type header based on FormData.
        // this.heads = this.heads.set('Content-Type', 'multipart/form-data');
        return this.http.post(PhotoService_1.ADD_PHOTO_URL, body, { headers: this.heads });
    };
    // Get photo object and related comments array from a photo id.
    PhotoService.prototype.GetPhotoAndComments = function (id) {
        this.SetRequestOptions();
        return this.http.get(PhotoService_1.GET_PHOTO_URL + '/' + id, { headers: this.heads });
    };
    // Update title and description of photo data.
    PhotoService.prototype.UpdatePhotoData = function (photo) {
        this.SetRequestOptions();
        return this.http.post(PhotoService_1.UPDATE_PHOTO_URL, photo, { headers: this.heads });
    };
    // Delete photo object and related comments based on a photo id.
    PhotoService.prototype.DeletePhotoAndComments = function (id) {
        this.SetRequestOptions();
        return this.http.post(PhotoService_1.DELETE_PHOTO_URL + '/' + id, null, { headers: this.heads });
    };
    // Add a new comment.
    PhotoService.prototype.AddComment = function (comment) {
        this.SetRequestOptions();
        return this.http.post(PhotoService_1.ADD_COMMENT_URL, comment, { headers: this.heads });
    };
    PhotoService.ALL_PHOTO_URL = 'api/Photo/GetAllPhotos';
    PhotoService.ADD_PHOTO_URL = 'api/Photo/AddPhoto';
    PhotoService.GET_PHOTO_URL = 'api/Photo/GetPhoto';
    PhotoService.UPDATE_PHOTO_URL = 'api/Photo/UpdatePhoto';
    PhotoService.DELETE_PHOTO_URL = 'api/Photo/DeletePhoto';
    PhotoService.ADD_COMMENT_URL = 'api/Photo/AddComment';
    PhotoService = PhotoService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [typeof (_a = typeof http_1.HttpClient !== "undefined" && http_1.HttpClient) === "function" && _a || Object, user_service_1.UserService])
    ], PhotoService);
    return PhotoService;
    var PhotoService_1, _a;
}());
exports.PhotoService = PhotoService;
//# sourceMappingURL=photo.service.js.map