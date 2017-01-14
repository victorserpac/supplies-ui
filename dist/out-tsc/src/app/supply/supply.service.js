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
var SupplyService = (function () {
    function SupplyService() {
        this.keyWord = 'supply';
    }
    SupplyService.prototype.list = function () {
        return new Promise(function (resolve, reject) {
            var supplies = Object.getOwnPropertyNames(localStorage)
                .filter(function (item) { return item.split('-')[0] == 'supply'; })
                .sort(function (a, b) { return a.split('-')[1] - b.split('-')[1]; })
                .map(function (item) {
                var supply = JSON.parse(localStorage[item]);
                var date = new Date(supply.validate);
                supply.validate = {
                    jsdate: date,
                    formatted: ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear()
                };
                return supply;
            });
            setTimeout(function () { return resolve(supplies); }, 1000);
        });
    };
    SupplyService.prototype.getMarkers = function () {
        return new Promise(function (resolve, reject) {
            var supplies = Object.getOwnPropertyNames(localStorage)
                .filter(function (item) { return item.split('-')[0] == 'supply'; })
                .map(function (item) {
                var supply = JSON.parse(localStorage[item]);
                var date = new Date(supply.validate);
                supply.validate = {
                    jsdate: date,
                    formatted: ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear()
                };
                return supply;
            })
                .map(function (item) { return ({
                lat: +item.location.lat,
                lng: +item.location.lng,
                info: item.name
            }); });
            setTimeout(function () { return resolve(supplies); }, 1000);
        });
    };
    SupplyService.prototype.sortByClosest = function (latLng) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var supplies = Object.getOwnPropertyNames(localStorage)
                .filter(function (item) { return item.split('-')[0] == 'supply'; })
                .map(function (item) {
                var supply = JSON.parse(localStorage[item]);
                var date = new Date(supply.validate);
                supply.validate = {
                    jsdate: date,
                    formatted: ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear()
                };
                return supply;
            })
                .sort(function (a, b) {
                var distanceA = _this.getDistanceFromLatLonInKm(latLng.lat, latLng.lng, a.location.lat, a.location.lng);
                var distanceB = _this.getDistanceFromLatLonInKm(latLng.lat, latLng.lng, b.location.lat, b.location.lng);
                return distanceA - distanceB;
            });
            setTimeout(function () { return resolve(supplies); }, 1000);
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
    SupplyService.prototype.getDistanceFromLatLonInKm = function (lat1, lon1, lat2, lon2) {
        var R = 6371;
        var dLat = this.deg2rad(lat2 - lat1);
        var dLon = this.deg2rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    };
    SupplyService.prototype.deg2rad = function (deg) {
        return deg * (Math.PI / 180);
    };
    return SupplyService;
}());
SupplyService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], SupplyService);
export { SupplyService };
//# sourceMappingURL=../../../../../src/app/supply/supply.service.js.map