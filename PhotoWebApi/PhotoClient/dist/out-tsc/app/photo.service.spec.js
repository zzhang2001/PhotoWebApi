"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var photo_service_1 = require("./photo.service");
describe('PhotoService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [photo_service_1.PhotoService]
        });
    });
    it('should be created', testing_1.inject([photo_service_1.PhotoService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=photo.service.spec.js.map