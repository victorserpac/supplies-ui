import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SupplyComponent } from '../supply/supply.component';
import { SupplyService } from '../supply/supply.service';
import { MapsAPILoader } from 'angular2-google-maps/core';

@Component({
  selector:    'app-supply-registration',
  templateUrl: './supply-registration.component.html',
  styleUrls:   [ './supply-registration.component.css' ]
})
export class SupplyRegistrationComponent implements OnInit {

  service;

  // Supply stuff
  supply = new SupplyComponent();
  types = [
    '',
    'Proteína',
    'Carboidrato',
    'Vitamina'
  ];

  // Datepicker config
  today = new Date();
  myDatePickerOptions = {
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

  // Map implementation
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  @ViewChild("search")
  public searchElementRef: ElementRef;

  // Form Validation
  registrationForm: FormGroup;
  submitted = false;
  filledDate = false;
  message = '';
  selectedDate = '';
  location = null;
  submit = false;


  constructor(
    service: SupplyService,
    fb: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this.service = service;

    this.registrationForm = fb.group({
      name: [ '', Validators.required ],
      type: [ '', Validators.required ]
    });
  }

  ngOnInit() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = -27.1136184;
    this.longitude = -50.8356141;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.location = place.formatted_address;
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  register( event ) {

    this.submitted = true;
    event.preventDefault();

    if (
      !this.registrationForm.valid ||
      !this.filledDate ||
      !this.searchControl.value ||
      !this.location
    ) {
      return false;
    }

    this.supply.location = {
      latLng: `${ this.latitude },${ this.longitude }`,
      lat: this.latitude,
      lng: this.longitude,
      formatted_address: this.location
    };
    this.service
      .register( this.supply )
      .then( msg => {
        this.message = msg;
        this.supply = new SupplyComponent();
        this.submitted = false;
        this.selectedDate = '';
        this.location = null;
        this.latitude = -27.1136184;
        this.longitude = -50.8356141;
        this.searchControl = new FormControl();
        this.zoom = 4;
      })
      .catch( msg => this.message = msg );
  }

  onDateChanged( date ) {
    this.selectedDate = date.formatted;

    if ( date.jsdate ) {
      this.filledDate = true;
      this.supply.validate = date.jsdate;
    } else {
      this.filledDate = false;
    }
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 14;
      });
    }
  }

  onEnter( event ) {
    return false;
  }

}
