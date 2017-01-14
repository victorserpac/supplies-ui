var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
var SupplyComponent = (function () {
    function SupplyComponent() {
    }
    return SupplyComponent;
}());
__decorate([
    Input(),
    __metadata("design:type", Object)
], SupplyComponent.prototype, "item", void 0);
__decorate([
    Input(),
    __metadata("design:type", Object)
], SupplyComponent.prototype, "name", void 0);
SupplyComponent = __decorate([
    Component({
        selector: 'supply',
        templateUrl: './supply.component.html',
        styleUrls: ['./supply.component.css']
    }),
    __metadata("design:paramtypes", [])
], SupplyComponent);
export { SupplyComponent };
//# sourceMappingURL=../../../../../src/app/supply/supply.component.js.map