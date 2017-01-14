var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { SupplyComponent } from '../supply/supply.component';
import { SupplyService } from '../supply/supply.service';
import { GeolocationService } from '../services/geolocation.service';
import { MapsAPILoader } from 'angular2-google-maps/core';
var SupplyRegistrationComponent = (function () {
    function SupplyRegistrationComponent(service, geolocationService, fb, mapsAPILoader, ngZone) {
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.supply = new SupplyComponent();
        this.types = [
            '',
            'Proteína',
            'Carboidrato',
            'Vitamina'
        ];
        this.today = new Date();
        this.myDatePickerOptions = {
            showTodayBtn: false,
            sunHighlight: false,
            editableMonthAndYear: false,
            disableUntil: {
                year: this.today.getFullYear(),
                month: this.today.getMonth() + 1,
                day: this.today.getDate() - 1
            },
            showClearDateBtn: false,
            selectionTxtFontSize: "14px",
            customPlaceholderTxt: "Digite ou selecione uma data de validade"
        };
        this.submitted = false;
        this.filledDate = false;
        this.message = '';
        this.selectedDate = '';
        this.location = null;
        this.submit = false;
        this.geolocationService = geolocationService;
        this.service = service;
        this.registrationForm = fb.group({
            name: ['', Validators.required],
            type: ['', Validators.required]
        });
    }
    SupplyRegistrationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.zoom = 4;
        this.latitude = -27.1136184;
        this.longitude = -50.8356141;
        this.searchControl = new FormControl();
        this.geolocationService
            .getCurrentPosition()
            .then(function (latLng) {
            _this.latitude = latLng.lat;
            _this.longitude = latLng.lng;
            _this.zoom = 14;
        });
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    var place = autocomplete.getPlace();
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    _this.location = place.formatted_address;
                    _this.latitude = place.geometry.location.lat();
                    _this.longitude = place.geometry.location.lng();
                    _this.zoom = 12;
                });
            });
        });
    };
    SupplyRegistrationComponent.prototype.register = function (event) {
        var _this = this;
        this.submitted = true;
        event.preventDefault();
        if (!this.registrationForm.valid ||
            !this.filledDate ||
            !this.searchControl.value ||
            !this.location) {
            return false;
        }
        this.supply.location = {
            latLng: this.latitude + "," + this.longitude,
            lat: this.latitude,
            lng: this.longitude,
            formatted_address: this.location
        };
        this.service
            .register(this.supply)
            .then(function (msg) {
            _this.message = msg;
            _this.supply = new SupplyComponent();
            _this.submitted = false;
            _this.selectedDate = '';
            _this.location = null;
            _this.latitude = -27.1136184;
            _this.longitude = -50.8356141;
            _this.searchControl = new FormControl();
            _this.zoom = 4;
        })
            .catch(function (msg) { return _this.message = msg; });
    };
    SupplyRegistrationComponent.prototype.onDateChanged = function (date) {
        this.selectedDate = date.formatted;
        if (date.jsdate) {
            this.filledDate = true;
            this.supply.validate = date.jsdate;
        }
        else {
            this.filledDate = false;
        }
    };
    SupplyRegistrationComponent.prototype.onEnter = function (event) {
        return false;
    };
    return SupplyRegistrationComponent;
}());
__decorate([
    ViewChild("search"),
    __metadata("design:type", ElementRef)
], SupplyRegistrationComponent.prototype, "searchElementRef", void 0);
SupplyRegistrationComponent = __decorate([
    Component({
        selector: 'app-supply-registration',
        templateUrl: './supply-registration.component.html',
        styleUrls: ['./supply-registration.component.css']
    }),
    __metadata("design:paramtypes", [SupplyService,
        GeolocationService,
        FormBuilder,
        MapsAPILoader,
        NgZone])
], SupplyRegistrationComponent);
export { SupplyRegistrationComponent };
//# sourceMappingURL=../../../../../src/app/supply-registration/supply-registration.component.js.map