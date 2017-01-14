var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { GeolocationService } from '../services/geolocation.service';
var SupplyService = (function () {
    function SupplyService(geolocationService) {
        this.geolocationService = geolocationService;
        this.keyWord = 'supply';
    }
    SupplyService.prototype.list = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function () { return resolve(_this.getFromLocalStorage()
                .sort(function (a, b) { return a.time - b.time; })); }, 1000);
        });
    };
    SupplyService.prototype.getMarkers = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function () { return resolve(_this.getFromLocalStorage()
                .map(function (item) { return ({
                lat: +item.location.lat,
                lng: +item.location.lng,
                info: item.name
            }); })); }, 1000);
        });
    };
    SupplyService.prototype.sortByClosest = function (currentLocation) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function () { return resolve(_this.getFromLocalStorage()
                .sort(function (a, b) {
                return _this.geolocationService.getCoordsDistance(currentLocation, a.location) -
                    _this.geolocationService.getCoordsDistance(currentLocation, b.location);
            })); }, 1000);
        });
    };
    SupplyService.prototype.register = function (supply) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var key = _this.keyWord + "-" + new Date().getTime();
            setTimeout(function () {
                localStorage[key] = JSON.stringify(supply);
                resolve('Suprimento cadastrado!');
            }, 1000);
        });
    };
    SupplyService.prototype.getFromLocalStorage = function () {
        var _this = this;
        return Object.getOwnPropertyNames(localStorage)
            .filter(function (item) { return item.split('-')[0] == _this.keyWord; })
            .map(function (item) {
            var supply = JSON.parse(localStorage[item]);
            var date = new Date(supply.validate);
            return Object.assign(supply, {
                validate: {
                    jsdate: date,
                    formatted: ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear()
                },
                time: item.split('-')[1]
            });
        });
    };
    return SupplyService;
}());
SupplyService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [GeolocationService])
], SupplyService);
export { SupplyService };
//# sourceMappingURL=../../../../../src/app/supply/supply.service.js.map