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
exports.__esModule = true;
exports.Peer = void 0;
var Peer = /** @class */ (function (_super) {
    __extends(Peer, _super);
    function Peer() {
        var _this = _super.call(this) || this;
        _this.channel = null;
        _this.channel = new BroadcastChannel("name");
        return _this;
    }
    Peer.prototype.send = function () {
        var msgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            msgs[_i] = arguments[_i];
        }
        var that = this.channel;
        msgs.forEach(function (msg) {
            that === null || that === void 0 ? void 0 : that.postMessage(msg);
        });
    };
    return Peer;
}(Object));
exports.Peer = Peer;
