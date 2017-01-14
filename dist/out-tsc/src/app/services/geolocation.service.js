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
var GeolocationService = (function () {
    function GeolocationService() {
    }
    GeolocationService.prototype.getCurrentPosition = function () {
        return new Promise(function (resolve, reject) {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                }, function () {
                    reject('Não foi possível obter a localização atual');
                });
            }
        });
    };
    GeolocationService.prototype.getCoordsDistance = function (coord1, coord2) {
        var R = 6371;
        var dLat = this.deg2rad(coord2.lat - coord1.lat);
        var dLon = this.deg2rad(coord2.lng - coord1.lng);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(coord1.lat)) * Math.cos(this.deg2rad(coord2.lat)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };
    GeolocationService.prototype.deg2rad = function (deg) {
        return deg * (Math.PI / 180);
    };
    return GeolocationService;
}());
GeolocationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], GeolocationService);
export { GeolocationService };
//# sourceMappingURL=../../../../../src/app/services/geolocation.service.js.map