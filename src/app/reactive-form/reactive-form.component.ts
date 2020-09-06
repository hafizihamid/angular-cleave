import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
require('cleave.js');
declare var Cleave: any;
declare var require: any;


@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
})
export class ReactiveFormComponent implements OnInit {
  cleaveForm: FormGroup;
  submittedForm = false;
  creditCard: any;
  phone: any;
  date: any;
  time: any;
  numeral: any;
  customOption: any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createCleaveForm();

    this.creditCard = new Cleave('#creditCard', {
      delimiter: ' ',
      blocks: [4, 4, 4, 4],
    });

    this.phone = new Cleave('#phone', {
      delimiter: ' ',
      blocks: [4, 4, 4, 4],
    });

    this.date = new Cleave('#date', {
      date: true,
      delimiter: '-',
      datePattern: ['Y', 'm', 'd']
    });

    this.time = new Cleave('#time', {
      time: true,
      timePattern: ['h', 'm', 's']
    });

    this.numeral = new Cleave('#numeral', {
      numeral: true,
      numeralThousandsGroupStyle: 'thousand'
    });

    this.customOption = new Cleave('#customOption', {
      blocks: [4, 2, 2, 4],
      uppercase: true
    });
  }

  get cleaveFormControl() {
    return this.cleaveForm.controls;
  }

  createCleaveForm() {
    this.cleaveForm = this.formBuilder.group({
      creditCard: ['', Validators.required],
      // @todo fix phone
      phone: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      numeral: ['', Validators.required],
      customOption: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submittedForm = true;
  }

  onReset() {
    this.submittedForm = false;
    this.cleaveForm.reset();
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
