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
var router_1 = require("@angular/router");
var viewmodels_1 = require("../viewmodels");
var photo_service_1 = require("../photo.service");
var user_service_1 = require("../user.service");
var DetailsComponent = /** @class */ (function () {
    function DetailsComponent(userService, route, router, photoService) {
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.photoService = photoService;
        // Object has to be initialized to prevent property undefined or null reference error
        // in browser console.
        this.photoViewModel = new viewmodels_1.PhotoViewModel();
        this.updatePhotoForm = new forms_1.FormGroup({
            newTitle: new forms_1.FormControl('', forms_1.Validators.required),
            newDescription: new forms_1.FormControl('', forms_1.Validators.required)
        });
        this.addCommentForm = new forms_1.FormGroup({
            newComment: new forms_1.FormControl('', forms_1.Validators.required)
        });
    }
    DetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Any view property with its properties referenced in template has to be initialized to prevent undefined error.
        this.route.params.subscribe(function (params) { return _this.id = params['id']; });
        this.LoadPhotoAndComments();
    };
    DetailsComponent.prototype.LoadPhotoAndComments = function () {
        var _this = this;
        this.photoService.GetPhotoAndComments(this.id).subscribe(function (result) {
            _this.photoViewModel = result;
        }, function (err) {
            // Provide description error message based on http response status code.
            if (err.status == 404) {
                _this.errMsg = err.error;
            }
            else {
                _this.errMsg = err.message;
            }
        });
    };
    DetailsComponent.prototype.UpdatePhoto = function () {
        var _this = this;
        var p = new viewmodels_1.PhotoViewModel();
        p.photoId = this.id;
        p.title = this.updatePhotoForm.value.newTitle;
        p.description = this.updatePhotoForm.value.newDescription;
        this.photoService.UpdatePhotoData(p).subscribe(function (result) {
            _this.photoViewModel = result;
        }, function (err) {
            _this.errMsg = err.message;
        });
    };
    DetailsComponent.prototype.DeletePhoto = function () {
        var _this = this;
        this.photoService.DeletePhotoAndComments(this.id).subscribe(function (result) {
            _this.router.navigate(['/home']);
        }, function (err) {
            // Provide description error message based on http response status code.
            if (err.status == 404) {
                _this.errMsg = err.error;
            }
            else {
                _this.errMsg = err.message;
            }
        });
    };
    DetailsComponent.prototype.AddComment = function () {
        var _this = this;
        var comment = new viewmodels_1.CommentViewModel();
        comment.body = this.addCommentForm.value.newComment;
        comment.photoId = this.photoViewModel.photoId;
        this.photoService.AddComment(comment).subscribe(function (result) {
            _this.photoViewModel.relatedComments = result;
        }, function (err) {
            // Provide description error message based on http response status code.
            if (err.status == 404) {
                _this.errMsg = err.error;
            }
            else {
                _this.errMsg = err.message;
            }
        });
    };
    Object.defineProperty(DetailsComponent.prototype, "newTitle", {
        get: function () { return this.updatePhotoForm.get('newTitle'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DetailsComponent.prototype, "newDescription", {
        get: function () { return this.updatePhotoForm.get('newDescription'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DetailsComponent.prototype, "newComment", {
        get: function () { return this.addCommentForm.get('newComment'); },
        enumerable: true,
        configurable: true
    });
    DetailsComponent = __decorate([
        core_1.Component({
            selector: 'app-details',
            templateUrl: './details.component.html',
            styleUrls: ['./details.component.css']
        }),
        __metadata("design:paramtypes", [user_service_1.UserService, typeof (_a = typeof router_1.ActivatedRoute !== "undefined" && router_1.ActivatedRoute) === "function" && _a || Object, typeof (_b = typeof router_1.Router !== "undefined" && router_1.Router) === "function" && _b || Object, photo_service_1.PhotoService])
    ], DetailsComponent);
    return DetailsComponent;
    var _a, _b;
}());
exports.DetailsComponent = DetailsComponent;
//# sourceMappingURL=details.component.js.map