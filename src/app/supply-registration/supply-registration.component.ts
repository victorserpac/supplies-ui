import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SupplyComponent } from '../supply/supply.component';
import { SupplyService } from '../supply/supply.service';
import { GeolocationService } from '../services/geolocation.service';
import { MapsAPILoader } from 'angular2-google-maps/core';

@Component({
  selector:    'app-supply-registration',
  templateUrl: './supply-registration.component.html',
  styleUrls:   [ './supply-registration.component.css' ]
})
export class SupplyRegistrationComponent implements OnInit {

  message = '';

  // Services
  geolocationService;
  supplyService;

  // Form Validation
  registrationForm: FormGroup;
  submitted;
  filledDate;
  location;

  // Defaults
  supply;
  types = [
    '',
    'Proteína',
    'Carboidrato',
    'Vitamina'
  ];

  // Map implementation
  searchControl: FormControl;
  lat;
  lng;
  zoom;
  @ViewChild( "search" )
  searchElementRef: ElementRef;

  // Datepicker
  selectedDate;
  myDatePickerOptions = {}


  constructor(
    supplyService: SupplyService,
    geolocationService: GeolocationService,
    fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    // Get services
    this.geolocationService = geolocationService;
    this.supplyService = supplyService;

    // Form inputs validation
    this.registrationForm = fb.group({
      name: [ '', Validators.required ],
      type: [ '', Validators.required ]
    });

    this.setDefaults();

    // Set datepicker configs
    let today = new Date();
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
  ngOnInit() {

    // Set current position
    this.geolocationService
      .getCurrentPosition()
      .then( latLng => {
        this.lat  = latLng.lat;
        this.lng  = latLng.lng;
        this.zoom = 14;
      });

    this.loadPlacesAutocomplete();
  }

  // Register event bind
  register( event ) {
    this.submitted = true;
    event.preventDefault();

    // Check all validations
    if ( !this.registrationForm.valid || !this.filledDate || !this.searchControl.value || !this.location ) {
      return false;
    }

    this.supply.location = {
      latLng: `${ this.lat },${ this.lng }`,
      lat: this.lat,
      lng: this.lng,
      formatted_address: this.location
    };

    this.supplyService
      .register( this.supply )
      .then( msg => {
        this.message = msg;
        this.setDefaults();
      })
      .catch( msg => this.message = msg );
  }

  // Change datepicker date event
  onDateChanged( date ) {
    this.selectedDate = date.formatted;

    if ( date.jsdate ) {
      this.filledDate = true;
      this.supply.validate = date.jsdate;
    } else {
      this.filledDate = false;
    }
  }

  // Prevent submit on enter key
  onEnter( event ) {
    return false;
  }

  // Set Defaults flags and variables in component
  setDefaults() {
    // Set google maps defaults
    this.zoom = 3;
    this.lat = 0;
    this.lng = 0;

    // Create search FormControl
    this.searchControl = new FormControl();

    // Instance new supply
    this.supply       = new SupplyComponent();

    // Set initial form validation
    this.submitted    = false;
    this.selectedDate = '';
    this.location     = null;
    this.filledDate   = false;
  }

  // load Places Autocomplete
  loadPlacesAutocomplete() {
    this.mapsAPILoader.load().then( () => {
      let autocomplete = new google.maps.places.Autocomplete( this.searchElementRef.nativeElement, {
        types: [ "address" ]
      });
      autocomplete.addListener( "place_changed", () => {
        this.ngZone.run( () => {
          // Get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // Verify result
          if ( place.geometry === undefined || place.geometry === null ) {
            return;
          }

          // Set latitude, longitude and zoom
          this.location = place.formatted_address;
          this.lat = place.geometry.location.lat();
          this.lng = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }
}
