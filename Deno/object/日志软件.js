"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var mod_ts_1 = require("https://deno.land/std/datetime/mod.ts");
var assert_ts_1 = require("https://deno.land/std@0.198.0/assert/assert.ts");
var Mapper_ts_1 = require("../package/Mapper.ts");
var LOG_FILE_PATH = "./logs/log.txt"; // 日志文件路径
function logOperation(operation, path, isDir) {
    var entry = {
        operation: operation,
        path: path,
        timestamp: (0, mod_ts_1.format)(new Date(), "yyyy-MM-dd HH:mm:ss"),
        isDir: isDir
    };
    var logEntry = JSON.stringify(entry);
    Deno.writeTextFileSync(LOG_FILE_PATH, "".concat(logEntry, "\n"), { append: true });
}
//去重
var lastCommand = "";
function handleFileOperation(operation, path) {
    var command = "\u6267\u884C\u4E86 ".concat(operation, "\u64CD\u4F5C \u5728\u6587\u4EF6\uFF1A ").concat(path);
    if (lastCommand === command)
        return;
    console.log(command);
    lastCommand = command;
    logOperation(operation, path, false);
}
function handleDirectoryOperation(operation, path) {
    var command = "\u6267\u884C\u4E86 ".concat(operation, "\u64CD\u4F5C \u5728\u76EE\u5F55: ").concat(path);
    if (lastCommand === command)
        return;
    console.log(command);
    lastCommand = command;
    logOperation(operation, path, true);
}
function handleFileCreation(path) {
    handleFileOperation("添加", path);
}
function handleFileDeletion(path) {
    handleFileOperation("删除", path);
}
function handleFileModification(path) {
    handleFileOperation("修改", path);
}
function handleDirectoryCreation(path) {
    handleDirectoryOperation("添加", path);
}
function handleDirectoryDeletion(path) {
    handleDirectoryOperation("删除", path);
}
function handleDirectoryModification(path) {
    handleDirectoryOperation("修改", path);
}
function watchDirectory(path) {
    var _a, e_1, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var _d, _e, _f, entry, e_1_1;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _g.trys.push([0, 5, 6, 11]);
                    _d = true, _e = __asyncValues(Deno.readDir(path));
                    _g.label = 1;
                case 1: return [4 /*yield*/, _e.next()];
                case 2:
                    if (!(_f = _g.sent(), _a = _f.done, !_a)) return [3 /*break*/, 4];
                    _c = _f.value;
                    _d = false;
                    entry = _c;
                    if (entry.isFile) {
                        console.log(entry);
                        handleFileModification(entry.path);
                    }
                    else if (entry.isDirectory) {
                        handleDirectoryModification(entry.path);
                    }
                    _g.label = 3;
                case 3:
                    _d = true;
                    return [3 /*break*/, 1];
                case 4: return [3 /*break*/, 11];
                case 5:
                    e_1_1 = _g.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 11];
                case 6:
                    _g.trys.push([6, , 9, 10]);
                    if (!(!_d && !_a && (_b = _e.return))) return [3 /*break*/, 8];
                    return [4 /*yield*/, _b.call(_e)];
                case 7:
                    _g.sent();
                    _g.label = 8;
                case 8: return [3 /*break*/, 10];
                case 9:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 10: return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    });
}
function watchChanges(path) {
    var _a, e_2, _b, _c, _d, e_3, _e, _f;
    return __awaiter(this, void 0, void 0, function () {
        var _g, stats, mapper, watcher, _h, watcher_1, watcher_1_1, event_1, e_2_1, watcher, _j, watcher_2, watcher_2_1, event_2, e_3_1;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0: return [4 /*yield*/, Deno.stat(path)];
                case 1:
                    _g = !(_k.sent()).isFile;
                    if (!_g) return [3 /*break*/, 3];
                    return [4 /*yield*/, Deno.stat(path)];
                case 2:
                    _g = !(_k.sent()).isDirectory;
                    _k.label = 3;
                case 3:
                    if (_g) {
                        console.log("Path does not exist.");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, Deno.stat(path)];
                case 4:
                    stats = _k.sent();
                    mapper = new Mapper_ts_1.Mapper(null, null);
                    if (!stats.isFile) return [3 /*break*/, 18];
                    console.log("Watching file changes...");
                    watcher = Deno.watchFs(path, { recursive: true });
                    mapper.map("create", function (event) {
                        handleFileCreation(event.customData[0].paths[0]);
                    });
                    mapper.map("modify", function (event) {
                        handleFileModification(event.customData[0].paths[0]);
                    });
                    mapper.map("remove", function (event) {
                        handleFileDeletion(event.customData[0].paths[0]);
                    });
                    _k.label = 5;
                case 5:
                    _k.trys.push([5, 11, 12, 17]);
                    _h = true, watcher_1 = __asyncValues(watcher);
                    _k.label = 6;
                case 6: return [4 /*yield*/, watcher_1.next()];
                case 7:
                    if (!(watcher_1_1 = _k.sent(), _a = watcher_1_1.done, !_a)) return [3 /*break*/, 10];
                    _c = watcher_1_1.value;
                    _h = false;
                    event_1 = _c;
                    if (["any", "access", "other"].includes(event_1.kind)) {
                        return [3 /*break*/, 9];
                    }
                    mapper.target = event_1.kind;
                    return [4 /*yield*/, mapper.callSync(event_1)];
                case 8:
                    _k.sent();
                    _k.label = 9;
                case 9:
                    _h = true;
                    return [3 /*break*/, 6];
                case 10: return [3 /*break*/, 17];
                case 11:
                    e_2_1 = _k.sent();
                    e_2 = { error: e_2_1 };
                    return [3 /*break*/, 17];
                case 12:
                    _k.trys.push([12, , 15, 16]);
                    if (!(!_h && !_a && (_b = watcher_1.return))) return [3 /*break*/, 14];
                    return [4 /*yield*/, _b.call(watcher_1)];
                case 13:
                    _k.sent();
                    _k.label = 14;
                case 14: return [3 /*break*/, 16];
                case 15:
                    if (e_2) throw e_2.error;
                    return [7 /*endfinally*/];
                case 16: return [7 /*endfinally*/];
                case 17: return [3 /*break*/, 32];
                case 18:
                    if (!stats.isDirectory) return [3 /*break*/, 32];
                    console.log("Watching directory changes...");
                    watcher = Deno.watchFs(path, { recursive: true });
                    mapper.map("create", function (event) {
                        handleDirectoryCreation(event.customData[0].paths[0]);
                    });
                    mapper.map("modify", function (event) {
                        handleDirectoryModification(event.customData[0].paths[0]);
                    });
                    mapper.map("remove", function (event) {
                        handleDirectoryDeletion(event.customData[0].paths[0]);
                    });
                    _k.label = 19;
                case 19:
                    _k.trys.push([19, 25, 26, 31]);
                    _j = true, watcher_2 = __asyncValues(watcher);
                    _k.label = 20;
                case 20: return [4 /*yield*/, watcher_2.next()];
                case 21:
                    if (!(watcher_2_1 = _k.sent(), _d = watcher_2_1.done, !_d)) return [3 /*break*/, 24];
                    _f = watcher_2_1.value;
                    _j = false;
                    event_2 = _f;
                    if (["any", "access", "other"].includes(event_2.kind)) {
                        return [3 /*break*/, 23];
                    }
                    mapper.target = event_2.kind;
                    return [4 /*yield*/, mapper.callSync(event_2)];
                case 22:
                    _k.sent();
                    _k.label = 23;
                case 23:
                    _j = true;
                    return [3 /*break*/, 20];
                case 24: return [3 /*break*/, 31];
                case 25:
                    e_3_1 = _k.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 31];
                case 26:
                    _k.trys.push([26, , 29, 30]);
                    if (!(!_j && !_d && (_e = watcher_2.return))) return [3 /*break*/, 28];
                    return [4 /*yield*/, _e.call(watcher_2)];
                case 27:
                    _k.sent();
                    _k.label = 28;
                case 28: return [3 /*break*/, 30];
                case 29:
                    if (e_3) throw e_3.error;
                    return [7 /*endfinally*/];
                case 30: return [7 /*endfinally*/];
                case 31:
                    // 监听目录下文件修改
                    watchDirectory(path);
                    _k.label = 32;
                case 32: return [2 /*return*/];
            }
        });
    });
}
(0, assert_ts_1.assert)((await Deno.stat(LOG_FILE_PATH)).isFile); // 确保日志文件夹存在
var directoryToWatch = (_a = prompt("输入监视的路径")) !== null && _a !== void 0 ? _a : ""; // 要监视的目录路径
watchChanges(directoryToWatch);
/*
* deno run --allow-write --allow-read 日志软件.ts
* */ 
