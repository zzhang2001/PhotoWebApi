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
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var AddphotoComponent = /** @class */ (function () {
    function AddphotoComponent(router, photoService) {
        this.router = router;
        this.photoService = photoService;
        this.loading = false;
        this.addPhotoForm = new forms_1.FormGroup({
            title: new forms_1.FormControl('', forms_1.Validators.required),
            description: new forms_1.FormControl('', forms_1.Validators.required)
        });
    }
    AddphotoComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(AddphotoComponent.prototype, "title", {
        get: function () { return this.addPhotoForm.get('title'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddphotoComponent.prototype, "description", {
        get: function () { return this.addPhotoForm.get('description'); },
        enumerable: true,
        configurable: true
    });
    AddphotoComponent.prototype.AddPhoto = function (file) {
        var _this = this;
        var files = file.files;
        if (files === null || files.length === 0) {
            this.errMsg = "File is not selected.";
            return;
        }
        if (this.addPhotoForm.invalid) {
            return;
        }
        // The form is valid. Post data and file.
        this.loading = true;
        var formData = new FormData();
        formData.append('title', this.addPhotoForm.value.title);
        formData.append('description', this.addPhotoForm.value.description);
        var fileContent = files[0];
        formData.append('file', fileContent, fileContent.name);
        this.photoService.AddPhoto(formData).subscribe(function (result) {
            _this.router.navigate(['/home']);
        }, function (err) {
            // Provide description error message based on http response status code.
            if (err.status == 400) {
                _this.errMsg = err.error;
            }
            else {
                _this.errMsg = err.message;
            }
        });
    };
    AddphotoComponent = __decorate([
        core_1.Component({
            selector: 'app-addphoto',
            templateUrl: './addphoto.component.html',
            styleUrls: ['./addphoto.component.css']
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _a || Object, photo_service_1.PhotoService])
    ], AddphotoComponent);
    return AddphotoComponent;
    var _a;
}());
exports.AddphotoComponent = AddphotoComponent;
//# sourceMappingURL=addphoto.component.js.map