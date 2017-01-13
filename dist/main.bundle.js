webpackJsonp([0,3],{

/***/ 216:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
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
    function SupplyService() {
        this.keyWord = 'supply';
    }
    SupplyService.prototype.list = function (latLng) {
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
        var R = 6371; // Radius of the earth in km
        var dLat = this.deg2rad(lat2 - lat1); // deg2rad below
        var dLon = this.deg2rad(lon2 - lon1);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    };
    SupplyService.prototype.deg2rad = function (deg) {
        return deg * (Math.PI / 180);
    };
    SupplyService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], SupplyService);
    return SupplyService;
}());
//# sourceMappingURL=/Users/victorserpac/Projects/supplies-ui/src/supply.service.js.map

/***/ },

/***/ 339:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__supply_supply_service__ = __webpack_require__(216);
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
    function SupplyListingComponent(service) {
        var _this = this;
        this.supplies = [];
        this.lat = 0;
        this.lng = 0;
        this.zoom = 2;
        this.service = service;
        this.service
            .list({
            lat: this.lat,
            lng: this.lng,
        })
            .then(function (supplies) { return _this.markers = supplies.map(function (item) { return ({
            lat: +item.location.lat,
            lng: +item.location.lng,
            info: item.name
        }); }); })
            .catch(function (msg) { return console.log(msg); });
        //set current position by geolocation
        this.setCurrentPosition()
            .then(function () {
            _this.service.list({
                lat: _this.lat,
                lng: _this.lng,
            })
                .then(function (supplies) { return _this.supplies = supplies; })
                .catch(function (msg) { return console.log(msg); });
        });
    }
    SupplyListingComponent.prototype.setCurrentPosition = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    _this.lat = position.coords.latitude;
                    _this.lng = position.coords.longitude;
                    _this.zoom = 5;
                    resolve();
                });
            }
        });
    };
    SupplyListingComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'supply-listing',
            template: __webpack_require__(694),
            styles: [__webpack_require__(690)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__supply_supply_service__["a" /* SupplyService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__supply_supply_service__["a" /* SupplyService */]) === 'function' && _a) || Object])
    ], SupplyListingComponent);
    return SupplyListingComponent;
    var _a;
}());
//# sourceMappingURL=/Users/victorserpac/Projects/supplies-ui/src/supply-listing.component.js.map

/***/ },

/***/ 340:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__supply_supply_component__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__supply_supply_service__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_google_maps_core__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_google_maps_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_google_maps_core__);
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
    function SupplyRegistrationComponent(service, fb, mapsAPILoader, ngZone) {
        this.mapsAPILoader = mapsAPILoader;
        this.ngZone = ngZone;
        // Supply stuff
        this.supply = new __WEBPACK_IMPORTED_MODULE_2__supply_supply_component__["a" /* SupplyComponent */]();
        this.types = [
            '',
            'Proteína',
            'Carboidrato',
            'Vitamina'
        ];
        // Datepicker config
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
        this.service = service;
        this.registrationForm = fb.group({
            name: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* Validators */].required],
            type: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* Validators */].required]
        });
    }
    SupplyRegistrationComponent.prototype.ngOnInit = function () {
        var _this = this;
        //set google maps defaults
        this.zoom = 4;
        this.latitude = -27.1136184;
        this.longitude = -50.8356141;
        //create search FormControl
        this.searchControl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
        //set current position
        this.setCurrentPosition();
        //load Places Autocomplete
        this.mapsAPILoader.load().then(function () {
            var autocomplete = new google.maps.places.Autocomplete(_this.searchElementRef.nativeElement, {
                types: ["address"]
            });
            autocomplete.addListener("place_changed", function () {
                _this.ngZone.run(function () {
                    //get the place result
                    var place = autocomplete.getPlace();
                    //verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    //set latitude, longitude and zoom
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
            _this.supply = new __WEBPACK_IMPORTED_MODULE_2__supply_supply_component__["a" /* SupplyComponent */]();
            _this.submitted = false;
            _this.selectedDate = '';
            _this.location = null;
            _this.latitude = -27.1136184;
            _this.longitude = -50.8356141;
            _this.searchControl = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */]();
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
    SupplyRegistrationComponent.prototype.setCurrentPosition = function () {
        var _this = this;
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.latitude = position.coords.latitude;
                _this.longitude = position.coords.longitude;
                _this.zoom = 14;
            });
        }
    };
    SupplyRegistrationComponent.prototype.onEnter = function (event) {
        return false;
    };
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])("search"), 
        __metadata('design:type', (typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === 'function' && _a) || Object)
    ], SupplyRegistrationComponent.prototype, "searchElementRef", void 0);
    SupplyRegistrationComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-supply-registration',
            template: __webpack_require__(695),
            styles: [__webpack_require__(691)]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__supply_supply_service__["a" /* SupplyService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__supply_supply_service__["a" /* SupplyService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["c" /* FormBuilder */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_google_maps_core__["MapsAPILoader"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4_angular2_google_maps_core__["MapsAPILoader"]) === 'function' && _d) || Object, (typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === 'function' && _e) || Object])
    ], SupplyRegistrationComponent);
    return SupplyRegistrationComponent;
    var _a, _b, _c, _d, _e;
}());
//# sourceMappingURL=/Users/victorserpac/Projects/supplies-ui/src/supply-registration.component.js.map

/***/ },

/***/ 341:
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
            template: __webpack_require__(696),
            styles: [__webpack_require__(692)]
        }), 
        __metadata('design:paramtypes', [])
    ], SupplyComponent);
    return SupplyComponent;
}());
//# sourceMappingURL=/Users/victorserpac/Projects/supplies-ui/src/supply.component.js.map

/***/ },

/***/ 402:
/***/ function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 402;


/***/ },

/***/ 403:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(532);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfills_ts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(531);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_module__ = __webpack_require__(528);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/Users/victorserpac/Projects/supplies-ui/src/main.js.map

/***/ },

/***/ 527:
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
            template: __webpack_require__(693),
            styles: [__webpack_require__(689)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=/Users/victorserpac/Projects/supplies-ui/src/app.component.js.map

/***/ },

/***/ 528:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(310);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__supply_supply_module__ = __webpack_require__(530);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_mydatepicker__ = __webpack_require__(521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_google_maps_core__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angular2_google_maps_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_angular2_google_maps_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__app_routes__ = __webpack_require__(529);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__(527);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__supply_registration_supply_registration_component__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__supply_listing_supply_listing_component__ = __webpack_require__(339);
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
                __WEBPACK_IMPORTED_MODULE_7__app_routes__["a" /* routing */],
                __WEBPACK_IMPORTED_MODULE_4__supply_supply_module__["a" /* SupplyModule */],
                __WEBPACK_IMPORTED_MODULE_5_mydatepicker__["a" /* MyDatePickerModule */],
                __WEBPACK_IMPORTED_MODULE_6_angular2_google_maps_core__["AgmCoreModule"].forRoot({
                    apiKey: "AIzaSyCRzRSIDKNJOEEXJhOkSh4tUNcoTk8NChA",
                    libraries: ["places"]
                }),
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_9__supply_registration_supply_registration_component__["a" /* SupplyRegistrationComponent */],
                __WEBPACK_IMPORTED_MODULE_10__supply_listing_supply_listing_component__["a" /* SupplyListingComponent */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/Users/victorserpac/Projects/supplies-ui/src/app.module.js.map

/***/ },

/***/ 529:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(511);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__supply_registration_supply_registration_component__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__supply_listing_supply_listing_component__ = __webpack_require__(339);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return routing; });



var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_2__supply_listing_supply_listing_component__["a" /* SupplyListingComponent */] },
    { path: 'cadastro', component: __WEBPACK_IMPORTED_MODULE_1__supply_registration_supply_registration_component__["a" /* SupplyRegistrationComponent */] },
    { path: '**', redirectTo: '' }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* RouterModule */].forRoot(appRoutes);
//# sourceMappingURL=/Users/victorserpac/Projects/supplies-ui/src/app.routes.js.map

/***/ },

/***/ 530:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__supply_component__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__supply_service__ = __webpack_require__(216);
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

/***/ 531:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return environment; });
var environment = {
    production: true
};
//# sourceMappingURL=/Users/victorserpac/Projects/supplies-ui/src/environment.prod.js.map

/***/ },

/***/ 532:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(543);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(539);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(545);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(544);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(542);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(538);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(537);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(547);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(540);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(548);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(546);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(551);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(712);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=/Users/victorserpac/Projects/supplies-ui/src/polyfills.js.map

/***/ },

/***/ 689:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 690:
/***/ function(module, exports) {

module.exports = ".sebm-google-map-container {\n  height: 500px;\n}\n"

/***/ },

/***/ 691:
/***/ function(module, exports) {

module.exports = "sebm-google-map{\n  height: 300px;\n}\n"

/***/ },

/***/ 692:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 693:
/***/ function(module, exports) {

module.exports = "<div class=\"jumbotron\">\n  <h1 class=\"text-center\">\n    Suprimentos App\n  </h1>\n</div>\n\n<nav class=\"navbar navbar-default\">\n  <div class=\"container-fluid\">\n    <div class=\"collapse navbar-collapse\">\n      <ul class=\"nav navbar-nav\">\n        <li><a [routerLink]=\"['']\">Home</a></li>\n      </ul>\n      <div class=\"navbar-form navbar-right\">\n        <a class=\"btn btn-primary\" [routerLink]=\"['/cadastro']\">Novo suprimento</a>\n      </div>\n    </div>\n  </div>\n</nav>\n\n<router-outlet></router-outlet>\n"

/***/ },

/***/ 694:
/***/ function(module, exports) {

module.exports = "<div class=\"container\">\n\n  <!-- this creates a google map on the page with the given lat/lng from -->\n  <!-- the component as the initial center of the map: -->\n\n  <div class=\"row\">\n\n    <sebm-google-map [latitude]=\"lat\" [longitude]=\"lng\" [zoom]=\"zoom\">\n      <sebm-google-map-marker *ngFor=\"let marker of markers\" [latitude]=\"marker.lat\" [longitude]=\"marker.lng\">\n       <sebm-google-map-info-window [disableAutoPan]=\"true\">\n         {{ marker.info }}\n       </sebm-google-map-info-window>\n     </sebm-google-map-marker>\n    </sebm-google-map>\n  </div>\n\n  <div class=\"row\">\n    <table class=\"table table-striped table-hover\">\n      <thead>\n        <tr>\n          <th>Nome</th>\n          <th>Tipo</th>\n          <th>Data de Validade</th>\n          <th>Localização</th>\n        </tr>\n      </thead>\n      <tbody>\n        <tr *ngFor=\"let supply of supplies\">\n          <td>{{ supply.name }}</td>\n          <td>{{ supply.type }}</td>\n          <td>{{ supply.validate.formatted }}</td>\n          <td>{{ supply.location.formatted_address }}</td>\n        </tr>\n        <tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n"

/***/ },

/***/ 695:
/***/ function(module, exports) {

module.exports = "<div class=\"container\">\n  <h2 class=\"text-center\">{{ supply.name }}</h2>\n\n  <p *ngIf=\"message.length\" class=\"alert alert-info\">{{ message }}</p>\n  <form\n    [formGroup]=\"registrationForm\"\n    (submit)=\"register( $event )\"\n    class=\"row\">\n    <div class=\"col-md-6 col-md-offset-3\">\n\n      <div class=\"form-group\">\n        <label>Nome</label>\n        <input formControlName=\"name\" name=\"name\" [(ngModel)]=\"supply.name\" class=\"form-control\" autocomplete=\"off\">\n\n        <div *ngIf=\"!registrationForm.controls.name.valid && submitted\">\n          <span *ngIf=\"registrationForm.controls.name.errors.required\" class=\"form-control alert-danger\">\n            Nome do suprimento é obrigatório\n          </span>\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label>Tipo</label><br>\n        <select\n          class=\"form-control\"\n          formControlName=\"type\"\n          [(ngModel)]=\"supply.type\"\n          name=\"type\">\n\n          <option [value]=\"type\" *ngFor=\"let type of types\">{{ type }}</option>\n        </select>\n\n        <div *ngIf=\"!registrationForm.controls.type.valid && submitted\">\n          <span *ngIf=\"registrationForm.controls.type.errors.required\" class=\"form-control alert-danger\">\n            Tipo do suprimento é obrigatório\n          </span>\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label>Validade</label><br>\n        <my-date-picker\n          [selDate]=\"selectedDate\"\n          [options]=\"myDatePickerOptions\"\n          locale=\"pt-br\"\n          (dateChanged)=\"onDateChanged($event)\">\n        </my-date-picker>\n\n        <div *ngIf=\"!filledDate && submitted\">\n          <span class=\"form-control alert-danger\">\n            Data de validade do suprimento é obrigatório\n          </span>\n        </div>\n      </div>\n\n      <div class=\"form-group\">\n        <label>Localização</label>\n        <input\n          #search\n          [formControl]=\"searchControl\"\n          autocorrect=\"off\"\n          autocapitalize=\"off\"\n          spellcheck=\"off\"\n          type=\"text\"\n          (keydown.enter)=\"onEnter( $event )\"\n          class=\"form-control\"\n          placeholder=\"Ex.: Rua dos Marcianos, 123\">\n\n        <div *ngIf=\"!this.searchControl.value && submitted\">\n          <span class=\"form-control alert-danger\">\n            Localização do suprimento é obrigatório\n          </span>\n        </div>\n        <div *ngIf=\"!this.location && submitted && this.searchControl.value\">\n          <span class=\"form-control alert-danger\">\n            Localização inválida\n          </span>\n        </div>\n        <sebm-google-map [latitude]=\"latitude\" [longitude]=\"longitude\" [scrollwheel]=\"false\" [zoom]=\"zoom\">\n          <sebm-google-map-marker [latitude]=\"latitude\" [longitude]=\"longitude\"></sebm-google-map-marker>\n        </sebm-google-map>\n\n      </div>\n\n      <button class=\"btn btn-primary\" type=\"submit\" name=\"button\">Salvar</button>\n      <a [routerLink]=\"['']\" class=\"btn\">Voltar</a>\n    </div>\n  </form>\n</div>\n"

/***/ },

/***/ 696:
/***/ function(module, exports) {

module.exports = "<div class=\"panel panel-default\">\n  <div class=\"panel-heading\">\n    <h3 class=\"panel-title text-center\">{{ item.name }}</h3>\n  </div>\n  <div class=\"panel-body\">\n    <p>Tipo: {{ item.type }}</p>\n    <p>Localização: {{ item.location }}</p>\n  </div>\n</div>\n"

/***/ },

/***/ 713:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(403);


/***/ }

},[713]);
//# sourceMappingURL=main.bundle.map