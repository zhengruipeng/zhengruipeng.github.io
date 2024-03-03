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
function reportableClassDecorator(constructor) {
    console.log(constructor);
    return class extends constructor {
        constructor() {
            super(...arguments);
            this.reportingURL = "http://www...";
        }
    };
}
let BugReport = class BugReport {
    constructor(t) {
        this.type = "report";
        this.title = t;
    }
};
BugReport = __decorate([
    reportableClassDecorator,
    __metadata("design:paramtypes", [String])
], BugReport);
const bug = (new BugReport("Needs dark mode"));
console.log(bug.title); // Prints "Needs dark mode"
console.log(bug.type); // Prints "report"
console.log(bug.reportingURL);
// Note that the decorator _does not_ change the TypeScript type
// and so the new property `reportingURL` is not known
// to the type system:
// bug.reportingURL;
// Property 'reportingURL' does not exist on type 'BugReport'.
