"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.CheckOutController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var CheckOutController = /** @class */ (function () {
    function CheckOutController(checkOutService) {
        this.checkOutService = checkOutService;
    }
    CheckOutController.prototype.getCheckOutPosition = function () {
        return this.checkOutService.getCheckOutPosition();
    };
    CheckOutController.prototype.saveCheckOutPostion = function (data) {
        return this.checkOutService.updateOne(data, 'check-out-position');
    };
    CheckOutController.prototype.findForPage = function (lat, lng) {
        if (lat === void 0) { lat = 1; }
        if (lng === void 0) { lng = 10; }
        return this.checkOutService.
            checkInOrOut(lat, lng);
    };
    __decorate([
        swagger_1.ApiOperation({ summary: '获取考勤范围信息' }),
        common_1.Get('/get/position')
    ], CheckOutController.prototype, "getCheckOutPosition");
    __decorate([
        swagger_1.ApiOperation({ summary: '修改考勤范围信息' }),
        common_1.Put('/update/position'),
        __param(0, common_1.Body())
    ], CheckOutController.prototype, "saveCheckOutPostion");
    __decorate([
        common_1.Get('/in-out/position'),
        swagger_1.ApiOperation({ summary: '根据经纬度查询是否在考勤范围内' }),
        swagger_1.ApiQuery({
            name: 'lat',
            description: '纬度',
            example: 0
        }),
        swagger_1.ApiQuery({
            name: 'lng',
            description: '经度',
            example: 0
        }),
        __param(0, common_1.Query('lat')),
        __param(1, common_1.Query('lng'))
    ], CheckOutController.prototype, "findForPage");
    CheckOutController = __decorate([
        swagger_1.ApiTags("考勤接口"),
        swagger_1.ApiBearerAuth()
        // @UseGuards(AuthGuard('jwt'))
        ,
        common_1.Controller("/check-out")
    ], CheckOutController);
    return CheckOutController;
}());
exports.CheckOutController = CheckOutController;
