webpackJsonp([0,3],{

/***/ 150:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return GeolocationService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GeolocationService = (function () {
    function GeolocationService() {
    }
    // Get current position by Geolocation
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
    // Get distance between 2 coordinates in KM
    GeolocationService.prototype.getCoordsDistance = function (coord1, coord2) {
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(coord2.lat - coord1.lat); // deg2rad below
        var dLon = this.deg2rad(coord2.lng - coord1.lng);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(coord1.lat)) * Math.cos(this.deg2rad(coord2.lat)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distance in km
    };
    // Convert degrees to radians
    GeolocationService.prototype.deg2rad = function (deg) {
        return deg * (Math.PI / 180);
    };
    GeolocationService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], GeolocationService);
    return GeolocationService;
}());
//# sourceMappingURL=/Users/victorserpac/Projects/supplies-ui/src/geolocation.service.js.map

/***/ },

/***/ 217:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_geolocation_service__ = __webpack_require__(150);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return SupplyService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SupplyService = (function () {
    function SupplyService(geolocationService) {
        this.geolocationService = geolocationService;
        this.keyWord = 'supply';
    }
    // List all supplies by registration time
    SupplyService.prototype.list = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            setTimeout(function () { return resolve(_this.getFromLocalStorage()
                .sort(function (a, b) { return a.time - b.time; })); }, 1000);
        });
    };
    // List all supplies and return an marker object formatted
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
    // List all supplies sorting by the closests ones
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
    // Register data in Local Storage
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
    // Get data from Local Storage
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
    SupplyService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_geolocation_service__["a" /* GeolocationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__services_geolocation_service__["a" /* GeolocationService */]) === 'function' && _a) || Object])
    ], SupplyService);
    return SupplyService;
    var _a;
}());
//# sourceMappingURL=/Users/victorserpac/Projects/supplies-ui/src/supply.service.js.map

/***/ },

/***/ 340:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__supply_supply_service__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_geolocation_service__ = __webpack_require__(150);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return SupplyListingComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SupplyListingComponent = (function () {
    function SupplyListingComponent(supplyService, geolocationService) {
        var _this = this;
        this.message = '';
        this.supplies = [];
        // Map defaults
        this.lat = 0;
        this.lng = 0;
        this.zoom = 2;
        this.supplyService = supplyService;
        this.geolocationService = geolocationService;
        // First list all supplies
        this.supplyService
            .list()
            .then(function (supplies) { return _this.supplies = supplies; })
            .catch(function (msg) { return _this.message = msg; });
        // List markers to put in map
        this.supplyService
            .getMarkers()
            .then(function (markers) { return _this.markers = markers; })
            .catch(function (msg) { return _this.message = msg; });
        // Update map and supplis list with GeoLocation
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
    SupplyListingComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'supply-listing',
            template: __webpack_require__(696),
            styles: [__webpack_require__(692)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__supply_supply_service__["a" /* SupplyService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__supply_supply_service__["a" /* SupplyService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_geolocation_service__["a" /* GeolocationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__services_geolocation_service__["a" /* GeolocationService */]) === 'function' && _b) || Object])
    ], SupplyListingComponent);
    return SupplyListingComponent;
    var _a, _b;
}());
//# sourceMappingURL=/Users/victorserpac/Projects/supplies-ui/src/supply-listing.component.js.map

/***/ },

/***/ 341:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__supply_supply_component__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__supply_supply_service__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_geolocation_service__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_google_maps_core__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_google_maps_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_google_maps_core__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return SupplyRegistrationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SupplyRegistrationComponent = (function () {
    function SupplyRegistrationComponent(supplyService, geolocationService, fb, mapsAPILoader, ngZone) {
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        this.message = '';
        this.types = [
            '',
            'Proteína',
            'Carboidrato',
            'Vitamina'
        ];
        this.myDatePickerOptions = {};
        // Get services
        this.geolocationService = geolocationService;
        this.supplyService = supplyService;
        // Form inputs validation
        this.registrationForm = fb.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* Validators */].required],
            type: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* Validators */].required]
        });
        this.setDefaults();
        // Set datepicker configs
        var today = new Date();
        this.myDatePickerOptions = {
            showTodayBtn: false,
            sunHighlight: false,
            editableMonthAndYear: false,
            disableUntil: {
                year: today.getFullYear(),
                month: today.getMonth() + 1,
                day: today.getDate() - 1
            },
            showClearDateBtn: false,
            selectionTxtFontSize: "14px",
            customPlaceholderTxt: "Digite ou selecione uma data de validade"
        };
    }
    // On component init
    SupplyRegistrationComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Set current position
        this.geolocationService
            .getCurrentPosition()
            .then(function (latLng) {
            _this.lat = latLng.lat;
            _this.lng = latLng.lng;
            _this.zoom = 14;
        });
        this.loadPlacesAutocomplete();
    };
    // Register event bind
    SupplyRegistrationComponent.prototype.register = function (event) {
        var _this = this;
        this.submitted = true;
        event.preventDefault();
        // Check all validations
        if (!this.registrationForm.valid || !this.filledDate || !this.searchControl.value || !this.location) {
            return false;
        }
        this.supply.location = {
            latLng: this.lat + "," + this.lng,
            lat: this.lat,
            lng: this.lng,
            formatted_address: this.location
        };
        this.supplyService
            .register(this.supply)
            .then(function (msg) {
            _this.message = msg;
            _this.setDefaults();
        })
            .catch(function (msg) { return _this.message = msg; });
    };
    // Change datepicker date event
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
    // Prevent submit on enter key
    SupplyRegistrationComponent.prototype.onEnter = function (event) {
        return false;
    };
    // Set Defaults flags and variables in component
    SupplyRegistrationComponent.prototype.setDefaults = function () {
        // Set google maps defaults
        this.zoom = 3;
        this.lat = 0;
        this.lng = 0;
        // Create search FormControl
        this.searchControl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        // Instance new supply
        this.supply = new __WEBPACK_IMPORTED_MODULE_2__supply_supply_component__["a" /* SupplyComponent */]();
        // Set initial form validation
        this.submitted = false;
        this.selectedDate = '';
        this.location = null;
        this.filledDate = false;
    };
    // load Places Autocomplete
    SupplyRegistrationComponent.prototype.loadPlacesAutocomplete = function () {
        var _this = this;
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    // Get the place result
                    var place = autocomplete.getPlace();
                    // Verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    // Set latitude, longitude and zoom
                    _this.location = place.formatted_address;
                    _this.lat = place.geometry.location.lat();
                    _this.lng = place.geometry.location.lng();
                    _this.zoom = 12;
                });
            });
        });
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("search"), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _a) || Object)
    ], SupplyRegistrationComponent.prototype, "searchElementRef", void 0);
    SupplyRegistrationComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-supply-registration',
            template: __webpack_require__(697),
            styles: [__webpack_require__(693)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__supply_supply_service__["a" /* SupplyService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__supply_supply_service__["a" /* SupplyService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__services_geolocation_service__["a" /* GeolocationService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__services_geolocation_service__["a" /* GeolocationService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_5_angular2_google_maps_core__["MapsAPILoader"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_5_angular2_google_maps_core__["MapsAPILoader"]) === 'function' && _e) || Object, (typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === 'function' && _f) || Object])
    ], SupplyRegistrationComponent);
    return SupplyRegistrationComponent;
    var _a, _b, _c, _d, _e, _f;
}());
//# sourceMappingURL=/Users/victorserpac/Projects/supplies-ui/src/supply-registration.component.js.map

/***/ },

/***/ 342:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return SupplyComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SupplyComponent = (function () {
    function SupplyComponent() {
    }
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], SupplyComponent.prototype, "item", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(), 
        __metadata('design:type', Object)
    ], SupplyComponent.prototype, "name", void 0);
    SupplyComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'supply',
            template: __webpack_require__(698),
            styles: [__webpack_require__(694)]
        }), 
        __metadata('design:paramtypes', [])
    ], SupplyComponent);
    return SupplyComponent;
}());
//# sourceMappingURL=/Users/victorserpac/Projects/supplies-ui/src/supply.component.js.map

/***/ },

/***/ 403:
/***/ function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 403;


/***/ },

/***/ 404:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(534);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfills_ts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(492);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(533);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_module__ = __webpack_require__(529);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/Users/victorserpac/Projects/supplies-ui/src/main.js.map

/***/ },

/***/ 528:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(695),
            styles: [__webpack_require__(691)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=/Users/victorserpac/Projects/supplies-ui/src/app.component.js.map

/***/ },

/***/ 529:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(311);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__supply_supply_module__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_mydatepicker__ = __webpack_require__(522);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_google_maps_core__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_google_maps_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angular2_google_maps_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_services_module__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_routes__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(528);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__supply_registration_supply_registration_component__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__supply_listing_supply_listing_component__ = __webpack_require__(340);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["b" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_8__app_routes__["a" /* routing */],
                __WEBPACK_IMPORTED_MODULE_4__supply_supply_module__["a" /* SupplyModule */],
                __WEBPACK_IMPORTED_MODULE_5_mydatepicker__["a" /* MyDatePickerModule */],
                __WEBPACK_IMPORTED_MODULE_6_angular2_google_maps_core__["AgmCoreModule"].forRoot({
                    apiKey: "AIzaSyCRzRSIDKNJOEEXJhOkSh4tUNcoTk8NChA",
                    libraries: ["places"]
                }),
                __WEBPACK_IMPORTED_MODULE_7__services_services_module__["a" /* ServicesModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_10__supply_registration_supply_registration_component__["a" /* SupplyRegistrationComponent */],
                __WEBPACK_IMPORTED_MODULE_11__supply_listing_supply_listing_component__["a" /* SupplyListingComponent */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Users/victorserpac/Projects/supplies-ui/src/app.module.js.map

/***/ },

/***/ 530:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(512);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__supply_registration_supply_registration_component__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__supply_listing_supply_listing_component__ = __webpack_require__(340);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return routing; });



var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__supply_listing_supply_listing_component__["a" /* SupplyListingComponent */] },
    { path: 'cadastro', component: __WEBPACK_IMPORTED_MODULE_1__supply_registration_supply_registration_component__["a" /* SupplyRegistrationComponent */] },
    { path: '**', redirectTo: '' }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */].forRoot(appRoutes);
//# sourceMappingURL=/Users/victorserpac/Projects/supplies-ui/src/app.routes.js.map

/***/ },

/***/ 531:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__geolocation_service__ = __webpack_require__(150);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return ServicesModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ServicesModule = (function () {
    function ServicesModule() {
    }
    ServicesModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */]
            ],
            declarations: [],
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__geolocation_service__["a" /* GeolocationService */]
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], ServicesModule);
    return ServicesModule;
}());
//# sourceMappingURL=/Users/victorserpac/Projects/supplies-ui/src/services.module.js.map

/***/ },

/***/ 532:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__supply_component__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__supply_service__ = __webpack_require__(217);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return SupplyModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SupplyModule = (function () {
    function SupplyModule() {
    }
    SupplyModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */]],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__supply_component__["a" /* SupplyComponent */]],
            exports: [__WEBPACK_IMPORTED_MODULE_2__supply_component__["a" /* SupplyComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_3__supply_service__["a" /* SupplyService */]],
        }), 
        __metadata('design:paramtypes', [])
    ], SupplyModule);
    return SupplyModule;
}());
//# sourceMappingURL=/Users/victorserpac/Projects/supplies-ui/src/supply.module.js.map

/***/ },

/***/ 533:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return environment; });
var environment = {
    production: true
};
//# sourceMappingURL=/Users/victorserpac/Projects/supplies-ui/src/environment.prod.js.map

/***/ },

/***/ 534:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(552);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(547);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(546);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(543);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(542);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(553);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(714);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=/Users/victorserpac/Projects/supplies-ui/src/polyfills.js.map

/***/ },

/***/ 691:
/***/ function(module, exports) {

module.exports = ".footer {\n  margin-top: 50px;\n  width: 100%;\n  height: 60px;\n  background-color: #f5f5f5;\n}\n.text-muted {\n    margin: 20px 0;\n}\n"

/***/ },

/***/ 692:
/***/ function(module, exports) {

module.exports = ".sebm-google-map-container {\n  height: 500px;\n}\n"

/***/ },

/***/ 693:
/***/ function(module, exports) {

module.exports = "sebm-google-map{\n  height: 300px;\n}\n"

/***/ },

/***/ 694:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 695:
/***/ function(module, exports) {

module.exports = "<div class=\"jumbotron\">\n  <h1 class=\"text-center\">\n    Suprimentos UI\n  </h1>\n</div>\n\n<nav class=\"navbar navbar-default\">\n  <div class=\"container-fluid\">\n    <div class=\"collapse navbar-collapse\">\n      <ul class=\"nav navbar-nav\">\n        <li><a [routerLink]=\"['']\">Home</a></li>\n      </ul>\n      <div class=\"navbar-form navbar-right\">\n        <a class=\"btn btn-primary\" [routerLink]=\"['/cadastro']\">Novo suprimento</a>\n      </div>\n    </div>\n  </div>\n</nav>\n\n<router-outlet></router-outlet>\n\n<footer class=\"footer\">\n  <div class=\"container\">\n    <p class=\"text-muted\">Made with love.</p>\n  </div>\n</footer>\n"

/***/ },

/***/ 696:
/***/ function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"row\">\n    <p *ngIf=\"message.length\" class=\"alert alert-info\">{{ message }}</p>\n\n    <sebm-google-map [latitude]=\"lat\" [longitude]=\"lng\" [zoom]=\"zoom\" [scrollwheel]=\"false\">\n      <sebm-google-map-marker *ngFor=\"let marker of markers\" [latitude]=\"marker.lat\" [longitude]=\"marker.lng\">\n       <sebm-google-map-info-window [disableAutoPan]=\"true\">\n         {{ marker.info }}\n       </sebm-google-map-info-window>\n     </sebm-google-map-marker>\n    </sebm-google-map>\n\n    <h2>Listagem de suprimentos</h2>\n    <table class=\"table table-striped table-hover\">\n      <caption>Suprimentos mais próximos de você</caption>\n      <thead>\n        <tr>\n          <th>Nome</th>\n          <th>Tipo</th>\n          <th>Data de Validade</th>\n          <th>Localização</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let supply of supplies\">\n          <td>{{ supply.name }}</td>\n          <td>{{ supply.type }}</td>\n          <td>{{ supply.validate.formatted }}</td>\n          <td>{{ supply.location.formatted_address }}</td>\n        </tr>\n        <tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n"

/***/ },

/***/ 697:
/***/ function(module, exports) {

module.exports = "<div class=\"container\">\n  <h2 class=\"text-center\">{{ supply.name }}</h2>\n\n  <p *ngIf=\"message.length\" class=\"alert alert-info\">{{ message }}</p>\n  <form [formGroup]=\"registrationForm\" (submit)=\"register( $event )\" class=\"row\">\n    <div class=\"col-md-6 col-md-offset-3\">\n\n      <div class=\"form-group\">\n        <label>Nome</label>\n        <input formControlName=\"name\" [(ngModel)]=\"supply.name\" class=\"form-control\" autocomplete=\"off\">\n\n        <div *ngIf=\"!registrationForm.controls.name.valid && submitted\">\n          <span *ngIf=\"registrationForm.controls.name.errors.required\" class=\"form-control alert-danger\">\n            Nome do suprimento é obrigatório\n          </span>\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label>Tipo</label><br>\n        <select formControlName=\"type\" [(ngModel)]=\"supply.type\" class=\"form-control\">\n          <option [value]=\"type\" *ngFor=\"let type of types\">{{ type }}</option>\n        </select>\n\n        <div *ngIf=\"!registrationForm.controls.type.valid && submitted\">\n          <span *ngIf=\"registrationForm.controls.type.errors.required\" class=\"form-control alert-danger\">\n            Tipo do suprimento é obrigatório\n          </span>\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label>Validade</label><br>\n        <my-date-picker\n          [selDate]=\"selectedDate\"\n          [options]=\"myDatePickerOptions\"\n          locale=\"pt-br\"\n          (dateChanged)=\"onDateChanged($event)\">\n        </my-date-picker>\n\n        <div *ngIf=\"!filledDate && submitted\">\n          <span class=\"form-control alert-danger\">\n            Data de validade do suprimento é obrigatório\n          </span>\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label>Localização</label>\n        <input\n          #search\n          [formControl]=\"searchControl\"\n          autocorrect=\"off\"\n          autocapitalize=\"off\"\n          spellcheck=\"off\"\n          type=\"text\"\n          (keydown.enter)=\"onEnter( $event )\"\n          class=\"form-control\"\n          placeholder=\"Ex.: Rua dos Marcianos, 123\">\n\n        <div *ngIf=\"!this.searchControl.value && submitted\">\n          <span class=\"form-control alert-danger\">\n            Localização do suprimento é obrigatório\n          </span>\n        </div>\n        <div *ngIf=\"!this.location && submitted && this.searchControl.value\">\n          <span class=\"form-control alert-danger\">\n            Localização inválida\n          </span>\n        </div>\n        <sebm-google-map [latitude]=\"lat\" [longitude]=\"lng\" [scrollwheel]=\"false\" [zoom]=\"zoom\">\n          <sebm-google-map-marker [latitude]=\"lat\" [longitude]=\"lng\"></sebm-google-map-marker>\n        </sebm-google-map>\n\n      </div>\n\n      <button class=\"btn btn-primary\" type=\"submit\" name=\"button\">Salvar</button>\n      <a [routerLink]=\"['']\" class=\"btn\">Voltar</a>\n    </div>\n  </form>\n</div>\n"

/***/ },

/***/ 698:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 715:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(404);


/***/ }

},[715]);
//# sourceMappingURL=main.bundle.map