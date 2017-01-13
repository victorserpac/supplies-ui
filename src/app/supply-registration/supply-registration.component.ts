import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SupplyComponent } from '../supply/supply.component';
import { SupplyService } from '../supply/supply.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TypeaheadMatch } from 'ng2-bootstrap';

@Component({
  selector:    'app-supply-registration',
  templateUrl: './supply-registration.component.html',
  styleUrls:   [ './supply-registration.component.css' ]
})
export class SupplyRegistrationComponent {

  service;

  // Form Validation
  registrationForm: FormGroup;
  submitted = false;
  filledDate = false;
  message = '';
  selectedDate = '';

  // Supply stuf
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

  public states:string[] = ['Alabama', 'Alaska', 'Arizona', 'Arkansas',
    'California', 'Colorado',
    'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
    'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
    'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico',
    'New York', 'North Dakota', 'North Carolina', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'];

  constructor( service: SupplyService, fb: FormBuilder ) {
    this.service = service;

    this.registrationForm = fb.group({
      name: [ '', Validators.required ],
      type: [ '', Validators.required ],
      location: [ '' ]
    });
  }

  register( event ) {
    this.submitted = true;
    event.preventDefault();

    if ( this.registrationForm.valid && this.filledDate ) {
      this.service
        .register( this.supply )
        .then( msg => {
          this.message = msg;
          this.supply = new SupplyComponent();
          this.submitted = false;
          this.selectedDate = '';
        })
        .catch( msg => this.message = msg );
    }
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

}
