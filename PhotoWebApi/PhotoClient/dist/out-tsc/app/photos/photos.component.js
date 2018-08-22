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
var photo_service_1 = require("../photo.service");
var PhotosComponent = /** @class */ (function () {
    function PhotosComponent(photoService) {
        this.photoService = photoService;
    }
    PhotosComponent.prototype.ngOnInit = function () {
        this.itemsPerPage = 3;
        this.photoViewModels = [];
        this.currentPhotoViewModels = [];
        this.LoadAllPhotos();
    };
    PhotosComponent.prototype.createRange = function (n) {
        var items = [];
        for (var i = 0; i < n; i++) {
            items.push(i);
        }
        return items;
    };
    PhotosComponent.prototype.showPage = function (i) {
        this.currentPage = i;
        if (this.currentPage == this.numOfPages) {
            this.currentPhotoViewModels = this.photoViewModels.slice((this.currentPage - 1) * this.itemsPerPage);
        }
        else {
            this.currentPhotoViewModels = this.photoViewModels.slice((this.currentPage - 1) * this.itemsPerPage, (this.currentPage * this.itemsPerPage));
        }
    };
    PhotosComponent.prototype.LoadAllPhotos = function () {
        var _this = this;
        this.photoService.GetAllPhotos().subscribe(function (result) {
            _this.photoViewModels = result;
            _this.numOfPages = Math.ceil(_this.photoViewModels.length / _this.itemsPerPage);
            _this.currentPage = 1;
            _this.showPage(_this.currentPage);
        }, function (err) {
            _this.errMsg = err.message;
        });
    };
    PhotosComponent = __decorate([
        core_1.Component({
            selector: 'app-photos',
            templateUrl: './photos.component.html',
            styleUrls: ['./photos.component.css']
        }),
        __metadata("design:paramtypes", [photo_service_1.PhotoService])
    ], PhotosComponent);
    return PhotosComponent;
}());
exports.PhotosComponent = PhotosComponent;
//# sourceMappingURL=photos.component.js.map