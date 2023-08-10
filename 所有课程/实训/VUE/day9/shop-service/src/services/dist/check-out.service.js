"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CheckOutService = void 0;
var common_1 = require("@nestjs/common");
var ResultData_1 = require("../utils/ResultData");
var base_service_1 = require("./base.service");
var CheckOutService = /** @class */ (function (_super) {
    __extends(CheckOutService, _super);
    function CheckOutService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CheckOutService.prototype.getCheckOutPosition = function () {
        return this.findById('001', 'check-out-position');
    };
    CheckOutService.prototype.check = function (lat1, lng1, lat2, lng2) {
        var radLat1 = lat1 * Math.PI / 180.0;
        var radLat2 = lat2 * Math.PI / 180.0;
        var a = radLat1 - radLat2;
        var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378.137; // EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000;
        return s;
    };
    CheckOutService.prototype.checkInOrOut = function (lat, lng) {
        var checkOut = this.findById('001', 'check-out-position').getData;
        var lat1 = checkOut.lat;
        var lng1 = checkOut.lng;
        var r = checkOut.r;
        var r1 = this.check(lat, lng, lat1, lng1);
        if (r >= r1) {
            return ResultData_1.ResultData.end(200, {}, "在范围内");
        }
        else {
            return ResultData_1.ResultData.end(500, {}, "不在范围内");
        }
    };
    CheckOutService = __decorate([
        common_1.Injectable()
    ], CheckOutService);
    return CheckOutService;
}(base_service_1.BaseService));
exports.CheckOutService = CheckOutService;
