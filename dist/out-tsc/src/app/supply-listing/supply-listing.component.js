var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { SupplyService } from '../supply/supply.service';
import { GeolocationService } from '../services/geolocation.service';
var SupplyListingComponent = (function () {
    function SupplyListingComponent(supplyService, geolocationService) {
        var _this = this;
        this.supplies = [];
        this.lat = 0;
        this.lng = 0;
        this.zoom = 2;
        this.supplyService = supplyService;
        this.geolocationService = geolocationService;
        this.supplyService
            .list()
            .then(function (supplies) { return _this.supplies = supplies; })
            .catch(function (msg) { return _this.message = msg; });
        this.supplyService
            .getMarkers()
            .then(function (markers) { return _this.markers = markers; })
            .catch(function (msg) { return _this.message = msg; });
        this.geolocationService
            .getCurrentPosition()
            .then(function (latLng) {
            _this.lat = latLng.lat;
            _this.lng = latLng.lng;
            _this.zoom = 8;
            return latLng;
        })
            .then(function (latLng) { return _this.supplyService.sortByClosest({
            lat: latLng.lat,
            lng: latLng.lng,
        }); })
            .then(function (supplies) { return _this.supplies = supplies; })
            .catch(function (msg) { return _this.message = msg; });
    }
    return SupplyListingComponent;
}());
SupplyListingComponent = __decorate([
    Component({
        selector: 'supply-listing',
        templateUrl: './supply-listing.component.html',
        styleUrls: ['./supply-listing.component.css']
    }),
    __metadata("design:paramtypes", [SupplyService,
        GeolocationService])
], SupplyListingComponent);
export { SupplyListingComponent };
//# sourceMappingURL=../../../../../src/app/supply-listing/supply-listing.component.js.map